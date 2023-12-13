import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { DOMAIN_URI } from "../config";

// This is the test public API key.
const stripePromise = loadStripe(
  "pk_test_51OCrEYIlWqny1x6ygARX3qSIhgszDPo1Ay7SQ9B3eIg4WfONaGM5pz59RQ6Et2DFctHQ9OYTb2orevc8hU5Qnlmw000ZltpXqk"
);

const ReturnPayment = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customSuccessMessage, setCustomSuccessMessage] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`${DOMAIN_URI}/checkout/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        // Check if payment is successful and update IsPaymentDone value
        if (data.status === "complete") {
          // Make a request to update IsPaymentDone in your backend
          const userId = data.client_reference_id;
          const paymentTrackingId = data.paymentTrackingId;

          axios
            .post(`${DOMAIN_URI}/shared/update-payment-status`, { userId, paymentTrackingId })
            .then(() => {
              setCustomSuccessMessage("Payment successfully completed!");
              const stripe = stripePromise;

              const { error } = stripe.redirectToCheckout({
                sessionId: data.sessionId,
              });

              Navigate("/success-payment");
            })
            .catch((error) => {
              console.error("Error updating payment status:", error);
            });
        }
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  return null;
};

export default withRouter(ReturnPayment);
