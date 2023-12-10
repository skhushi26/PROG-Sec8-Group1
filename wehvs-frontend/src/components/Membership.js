import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import axios from "axios";


// This is the test public API key.
const stripePromise = loadStripe("pk_test_51OCrEYIlWqny1x6ygARX3qSIhgszDPo1Ay7SQ9B3eIg4WfONaGM5pz59RQ6Et2DFctHQ9OYTb2orevc8hU5Qnlmw000ZltpXqk");

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchData = async () => {
     const userId = localStorage.getItem("userId");

      // Create a Checkout Session as soon as the page loads
      const response = await fetch("http://localhost:3333/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error(error);
      }
    };
  
      fetchData();
    }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}


const cancelSubscription = async () => {
  try {
    const paymentTrackingId = localStorage.getItem('paymentTrackingId');
    const response = await axios.post('http://localhost:3333/checkout/cancel-subscription', { paymentTrackingId });

    // Handle successful subscription cancellation
    console.log(response.data.message);
  } catch (error) {
    // Handle errors
    console.error('Error canceling subscription:', error);
  }
};


const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customSuccessMessage, setCustomSuccessMessage] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`http://localhost:3333/checkout/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email); 

           // Check if payment is successful and update IsPaymentDone value
           if (data.status === 'complete') {
            // Make a request to update IsPaymentDone in your backend
            const userId = data.client_reference_id;
            const paymentTrackingId = data.paymentTrackingId; 
            const isPaymentDone = true; 

            localStorage.setItem("isPaymentDone", isPaymentDone);
            localStorage.setItem("paymentTrackingId", data.paymentTrackingId);
          
            axios.post('http://localhost:3333/shared/update-payment-status', { userId, paymentTrackingId })
              .then(() => {
                setCustomSuccessMessage('Payment successfully completed!');
                const stripe =  stripePromise;

                const { error } = stripe.redirectToCheckout({
                sessionId: data.sessionId,
              });

              Navigate("/success-payment");
              })
              .catch((error) => {
                console.error('Error updating payment status:', error);
              });


             
          }

      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  return (
    <div>
      {status === 'complete' && (
        <div>
          <p>Payment successful!</p>
          <p>Email: {customerEmail}</p>
          {/* Add the Cancel Subscription button here */}
          <button onClick={cancelSubscription}>Cancel Subscription</button>
        </div>
      )}
    </div>
  );
  // return null;
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </Router>
    </div>
  )
}

export default withRouter(CheckoutForm);

