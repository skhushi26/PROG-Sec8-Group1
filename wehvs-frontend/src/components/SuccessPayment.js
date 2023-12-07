import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import { loadStripe } from '@stripe/stripe-js';
import { Link, Navigate } from "react-router-dom";
import axios from "axios";


const SuccessPayment = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customSuccessMessage, setCustomSuccessMessage] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const stripe = loadStripe("pk_test_51OCrEYIlWqny1x6ygARX3qSIhgszDPo1Ay7SQ9B3eIg4WfONaGM5pz59RQ6Et2DFctHQ9OYTb2orevc8hU5Qnlmw000ZltpXqk");
    
    fetch(`http://localhost:3333/checkout/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);

        // Check if payment is successful and update IsPaymentDone value
        if (data.status === 'complete') {
          // Make a request to update IsPaymentDone in your backend
          const userId = data.userId;
          const paymentTrackingId = data.paymentTrackingId;

          axios.post('http://localhost:3333/shared/update-payment-status', { userId, paymentTrackingId })
            .then(() => {
              setCustomSuccessMessage('Payment successfully completed!');

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
      {/* CONTENT */}
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 mt-1 my-3 mt-1">
          <div className="d-flex flex-column align-items-center text-center p-3 pt-5"><img className="rounded-circle" width="120px" src="/images/checklist.png"></img></div>

          <h1 className="my-3">Thanks for your subscription!</h1>
          <p> We appreciate for your interest! <br />
            If you have any questions, please email <a href="mailto:orders@example.com">wevhs2023@gmail.com</a>.
            <br />
            <Link to="/user/apply-certificate" className="button button-contactForm boxed-btn btn-login mr-3 my-4">Go Back and Complete Request</Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer-area footer-bg footer-padding">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-caption mb-50">
                <div className="single-footer-caption mb-30">
                  <div className="footer-tittle">
                    <h4>About Us</h4>
                    <div className="footer-pera">
                      <p>
                        WEHVS focus on enabling everyone to leverage their work experience and
                        skills anywhere in the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>Contact Info</h4>
                  <ul>
                    <li>
                      <p>60 Frederick St Kitchener, ON.</p>
                    </li>
                    <li>
                      <a href="#">Phone : +8880 44338899</a>
                    </li>
                    <li>
                      <a href="#">Email : info@wehvs.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>IMPORTANT LINKS</h4>
                  <ul>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">Careers</a>
                    </li>
                    <li>
                      <a href="#">Login/ Register</a>
                    </li>
                    <li>
                      <a href="#">Press Releases</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="single-footer-caption mb-50">
                <div className="footer-tittle">
                  <h4>Newsletter</h4>
                  <div className="footer-pera footer-pera2">
                    <p>Get timely updates from WEHVS, and discover other tools and publications</p>
                  </div>
                  <div className="footer-form">
                    <div id="mc_embed_signup">
                      <form
                        target="_blank"
                        action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                        method="get"
                        className="subscribe_form relative mail_part"
                      >
                        <input
                          type="email"
                          name="email"
                          id="newsletter-form-email"
                          placeholder="Email Address"
                          className="placeholder hide-on-focus"
                        />
                        <div className="form-icon">
                          <button
                            type="submit"
                            name="submit"
                            id="newsletter-submit"
                            className="email_icon newsletter-submit button-contactForm"
                          >
                            <img src="/images/logo/form.png" alt="" />
                          </button>
                        </div>
                        <div className="mt-10 info"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row footer-wejed d-flex justify-content-around">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="footer-tittle-bottom">
                <span>5000+</span>
                <p>Verified Employers</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="footer-tittle-bottom">
                <span>3000+</span>
                <p>Talented Workers</p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
              <div className="footer-tittle-bottom">
                <span>500+</span>
                <p>Skilled Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SuccessPayment);