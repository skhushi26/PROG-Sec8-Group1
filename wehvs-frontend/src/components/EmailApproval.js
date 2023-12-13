import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DOMAIN_URI } from "../config";

const EmailApproval = () => {
  const { token } = useParams();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${DOMAIN_URI}/shared/verify/${token}`);
        console.log("response", response);
        if (response.ok) {
          setMessage("Your email has been approved");
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setMessage(
          "Something went wrong in approving your email. Please contact the administrator."
        );
        setSuccess(false);
      }
    };

    verifyToken();
  }, [token]);
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="col-sm-10 m-auto mt-5">
          {success !== null &&
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
        <Link to="/login" className="button button-contactForm boxed-btn btn-login mr-3 mt-4">
          Go to Login Page
        </Link>
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
          <div className="row footer-wejed justify-content-between">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div className="footer-logo mb-20">
                <a href="index.html">
                  <img src="assets/img/logo/logo2_footer.png" alt="" />
                </a>
              </div>
            </div>
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
    </>
  );
};

export default EmailApproval;
