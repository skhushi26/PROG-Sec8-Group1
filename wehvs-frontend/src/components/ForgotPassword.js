import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const validateForgotPassword = async (e) => {
    e.preventDefault();

    let valid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.match(emailPattern)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // If all validations pass, you can proceed with further action
    if (valid) {
      try {
        const response = await axios.post("http://localhost:3333/users/forgot-password", {
          email,
        });
        console.log("response", response);
        if (response.data.statusCode === 200) {
          setMessage(response.data.message);
          setSuccess(true);
        } else if (response.data.statusCode === 400) {
          setMessage(response.data.message);
          setSuccess(false);
        } else {
          setMessage(response.data.message);
          setSuccess(false);
        }
      } catch (error) {
        setMessage("Something went wrong in sending reset password link");
        setSuccess(false);
      }
    }
  };
  return (
    <div>
      {/* CONTENT */}
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 mt-5">
          <form
            name="resetPassword"
            className="form-contact contact_form"
            method="post"
            id="contactForm"
            onSubmit={validateForgotPassword}
          >
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Forgot your password?</h2>
              </div>
              <p>
                Note: Reset password link will be send to the entered emailid. This link will be
                valid for 10 minutes!
              </p>
              <div className="col-sm-10 m-auto">
                {success !== null && // Change condition to only render if success is not null
                  (success ? (
                    <div className="alert alert-success" role="alert" bis_skin_checked="1">
                      {message}
                    </div>
                  ) : (
                    <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                      {message}
                    </div>
                  ))}
              </div>
              <div
                className="col-sm-10 m-auto
                                  "
              >
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control valid"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="error-message text-danger">{emailError}</span>
                </div>
              </div>
            </div>
            <div className="col-12 form-group mt-2 mb-2">
              <button type="submit" className="button button-contactForm button-login boxed-btn">
                Send
              </button>
            </div>
            {/* <div className="mt-4">
              <p className="mb-0">Don't have an account yet? Sign Up here!</p>
              <p className="mt-0">
                <a href="/employerregister">Register as Employer</a> |{" "}
                <a href="/userregister">Register as User</a>
              </p>
            </div> */}
          </form>
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

export default ForgotPassword;
