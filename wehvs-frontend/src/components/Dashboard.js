import React, { useState } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  return (
    <div>
      {/* Hero Area Start*/}
      <div className="slider-area ">
        <div className="single-slider section-overly slider-height2 d-flex align-items-center dashboard-banner-bg">
          {/* <img className="single-slider section-overly slider-height2 d-flex align-items-center" src="/images/about.jpg"></img> */}
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap text-center">
                  <h2>WEHVS</h2>
                  <h3>Connecting the world</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Area End */}
      {/* Support Company Start*/}
      <div className="support-company-area fix section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="right-caption">
                {/* Section Tittle */}
                <div className="section-tittle section-tittle2">
                  <span>What we are doing</span>
                  <h2>Talented people are getting Jobs</h2>
                </div>
                <div className="support-caption">
                  <p className="pera-top">
                    Explore a diverse range of job opportunities tailored to your skills and
                    interests through our WEHVS Apply effortlessly your chosen job with our WEHVS
                    platform Securing your dream job as you successfully navigate our platform's
                    streamlined application process, bringing you closer to a rewarding career
                  </p>
                  <a href="/user/jobs" className="button button-contactForm boxed-btn mr-3">
                    Find a job
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="support-location-img">
                {/* <img src="/images/support-img.jpg" alt="" /> */}
                <img
                  className="single-slider section-overly slider-height2 d-flex align-items-center"
                  src="/images/support-img.jpg"
                ></img>

                <div className="support-img-cap text-center">
                  <p>Since</p>
                  <span>2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Support Company End*/}

      {/* How  Apply Process Start*/}
      <div className="apply-process-area apply-bg pt-80 pb-50 mb-50 how-to-apply-bg">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-tittle section-tittle2 white-text text-center">
                <span>Apply process</span>
                <h2> How it works</h2>
              </div>
            </div>
          </div>
          {/* Apply Process Caption  */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-search"></span>
                </div>
                <div className="process-cap">
                  <h5>1. Send a Request</h5>
                  <p>
                    To begin the employment verification process, users must submit a request to
                    their former employer. Provide accurate information about your tenure at the
                    company to facilitate a seamless verification process.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-curriculum-vitae"></span>
                </div>
                <div className="process-cap">
                  <h5>2. Wait for the Evaluation</h5>
                  <p>
                    Once the request is received, the employer will carefully evaluate the provided
                    information. This step involves a thorough review of the user's employment
                    history during the specified period. The employer will then make a decision to
                    either approve or deny the verification request.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-process text-center mb-30">
                <div className="process-ion">
                  <span className="flaticon-tour"></span>
                </div>
                <div className="process-cap">
                  <h5>3. Get your certificate</h5>
                  <p>
                    Users will be promptly notified of the employer's decision. If the employment
                    verification request is approved, users will receive a digitally-signed
                    certificate affirming their employment history. This certificate can be securely
                    shared with relevant parties as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 form-group mt-3">
              <a
                href="/user/apply-certificate"
                className="button button-contactForm boxed-btn mr-3"
              >
                Start a user request
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* How  Apply Process End */}

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
                      <p>Waterloo, ON.</p>
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

export default withRouter(Dashboard);
