import React, { useState } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";
import axios from "axios";

const UserCertificateRequest = () => {
    const [companyName, setcompanyName] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [jobTitle, setjobTitle] = useState("");
    const [comment, setcomment] = useState("");


    const [companyNameError, setcompanyNameError] = useState("");
    const [startDateError, setstartDateError] = useState("");
    const [endDateError, setendDateError] = useState("");
    const [jobTitleError, setjobTitleError] = useState("");

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(null);

    const isValidDateFormat = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    };

    const validateUserCertificateRequest = async (e) => {
        e.preventDefault();

        let valid = true;

        // Company Name validation
        if (companyName.trim() === "") {
            setcompanyNameError("Company Name is required");
            valid = false;
        } else {
            setcompanyNameError("");
        }

        // Job Title validation
        if (jobTitle.trim() === "") {
            setjobTitleError("Job Title is required");
            valid = false;
        } else {
            setjobTitleError("");
        }

        // Start Date validation
        if (startDate.trim() === "") {
            setstartDateError("Start Date is required");
            valid = false;
        } else if (!isValidDateFormat(startDate)) {
            setendDateError("Invalid date format. Please use YYYY-MM-DD");
            valid = false;
        } else {
            setstartDateError("");
        }

        // End Date validation
        if (endDate.trim() === "") {
            setendDateError("End Date is required");
            valid = false;
        } else if (!isValidDateFormat(endDate)) {
            setendDateError("Invalid date format. Please use YYYY-MM-DD");
            valid = false;
        } else if (new Date(startDate) >= new Date(endDate)) {
            setendDateError("End Date should be after Start Date");
            valid = false;
        } else {
            setendDateError("");
        }

        // If all validations pass, you can proceed with further action
        if (valid) {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.post("http://localhost:3333/user-request/send", {
                    userId,
                    companyName,
                    startDate,
                    endDate,
                    jobTitle,
                    comment
                });
                console.log("response", response);
                if (response.data.statusCode === 200) {
                    setMessage(response.data.message);
                    setSuccess(true);

                    // Clear the form or reset state values
                    setcompanyName("");
                    setstartDate("");
                    setendDate("");
                    setjobTitle("");
                    setcomment("");
                } else if (response.data.statusCode === 400) {
                    setMessage(response.data.message);
                    setSuccess(false);
                } else {
                    setMessage(response.data.message);
                    setSuccess(false);
                }
            } catch (error) {
                console.error(error);
                setMessage(error.response.data.message);
                setSuccess(false);
            }
        }
    };
    return (
        <div>
            {/* CONTENT */}
            <div className="row container">
                <div className="col-lg-12">
                    <form className="form-contact contact_form" method="post" id="contactForm"
                        onSubmit={validateUserCertificateRequest}>
                        <div className="col-12">
                            <h1 className="contact-title">WEHVS Certificate Request Form</h1>
                        </div>
                        <div className="col-sm-12 m-auto">
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

                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="companyName">Company Name</label>
                                        <input className="form-control valid" name="companyName" id="companyName" type="text" placeholder="Company Name" value={companyName}
                                            onChange={(e) => setcompanyName(e.target.value)} />
                                        <span className="error-message text-danger">{companyNameError}</span>
                                    </div>
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="companyName">Job Title</label>
                                        <input className="form-control valid" name="jobTitle" id="jobTitle" type="text" placeholder="Job Title" value={jobTitle}
                                            onChange={(e) => setjobTitle(e.target.value)} />
                                        <span className="error-message text-danger">{jobTitleError}</span>
                                    </div>
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="startDate">Start Date</label>
                                        <input className="form-control" name="startDate" id="startDate" type="date" placeholder="Select Start Date" value={startDate}
                                            onChange={(e) => setstartDate(e.target.value)} />
                                        <span className="error-message text-danger">{startDateError}</span>
                                    </div>
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="endDate">End Date</label>
                                        <input className="form-control" name="endDate" id="endDate" type="date" placeholder="Select End Date" value={endDate}
                                            onChange={(e) => setendDate(e.target.value)} />
                                        <span className="error-message text-danger">{endDateError}</span>
                                    </div>
                                    <div className="col-sm-12  mt-4">
                                        <label htmlFor="comment">Comment</label>
                                        <textarea className="form-control" name="comment" id="comment" placeholder="Comments" value={comment}
                                        onChange={(e) => setcomment(e.target.value)} ></textarea>
                                    </div>
                                    <div className="col-12 form-group mt-5">
                                        <button type="submit" className="button button-contactForm button-submit boxed-btn">Send</button>
                                    </div>
                                    <div className="col-sm-12">
                                        <Link className="success medium membership-link" to="/membership">Upgrade to Premium Membership</Link><br />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                            <p>WEHVS focus on enabling everyone to leverage their work experience and skills anywhere in the world.</p>
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
                                            <p>60 Frederick St
                                                Kitchener, ON.</p>
                                        </li>
                                        <li><a href="#">Phone : +8880 44338899</a></li>
                                        <li><a href="#">Email : info@wehvs.com</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="single-footer-caption mb-50">
                                <div className="footer-tittle">
                                    <h4>IMPORTANT LINKS</h4>
                                    <ul>
                                        <li><a href="#">Contact Us</a></li>
                                        <li><a href="#">Careers</a></li>
                                        <li><a href="#">Login/ Register</a></li>
                                        <li><a href="#">Press Releases</a></li>
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
                                    <div className="footer-form" >
                                        <div id="mc_embed_signup">
                                            <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                                method="get" className="subscribe_form relative mail_part">
                                                <input type="email" name="email" id="newsletter-form-email" placeholder="Email Address"
                                                    className="placeholder hide-on-focus" />
                                                <div className="form-icon">
                                                    <button type="submit" name="submit" id="newsletter-submit"
                                                        className="email_icon newsletter-submit button-contactForm"><img src="/images/logo/form.png" alt="" /></button>
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
                                <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
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

        </div>
    );
    //   }
};

export default withRouter(UserCertificateRequest);
