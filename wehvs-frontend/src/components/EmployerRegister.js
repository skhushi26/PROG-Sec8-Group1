import React, { useState } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployerRegister = () => {
  const [companyName, setcompanyName] = useState("");
  const [licenseNumber, setlicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, settelephone] = useState("");
  const [foundedDate, setfoundedDate] = useState("");
  const [description, setdescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");


  const [companyNameError, setcompanyNameError] = useState("");
  const [licenseNumberError, setlicenseNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [telephoneError, settelephoneError] = useState("");
  const [contactEmailError, setContactEmailError] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const validateEmployerRegister = async (e) => {
    e.preventDefault();

    let valid = true;

    // Company Name validation
    if (companyName.trim() === "") {
      setcompanyNameError("Company Name is required");
      valid = false;
    } else {
      setcompanyNameError("");
    }

    // licenseNumber validation
    if (licenseNumber.trim() === "") {
      setlicenseNumberError("License Number is required");
      valid = false;
    } else {
      setlicenseNumberError("");
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.match(emailPattern)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (!password.match(passwordPattern)) {
      setPasswordError(
        "Password must be at least 8 characters, one uppercase, one lowercase, and one number"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // Address validation
    if (address.trim() === "") {
      setAddressError("Address is required");
      valid = false;
    } else {
      setAddressError("");
    }

    // Telephone validation
    if (telephone.trim() === "") {
      settelephoneError("Telephone is required");
      valid = false;
    } else {
      settelephoneError("");
    }


    // Contact Email validation
    if (contactEmail.trim() === "") {
        setContactEmailError("Contact Email is required");
        valid = false;
      } else if (!contactEmail.match(emailPattern)) {
        setContactEmailError("Invalid email address");
        valid = false;
      } else {
        setContactEmailError("");
      }

    // If all validations pass, you can proceed with further action
    if (valid) {
      try {
        const response = await axios.post("http://localhost:3333/employers/register", {
          companyName,
          licenseNumber,
          email,
          password,
          foundedDate,
          address,
          city,
          province,
          country,
          zipCode,
          telephone,
          contactEmail,
          mobileNumber,
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
        console.log(error);
        setMessage("Something went wrong in sending verification mail");
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
                        onSubmit={validateEmployerRegister}>
                            <div className="col-12">
                                <h1 className="contact-title">Employer Register</h1>
                            </div>
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

                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className="rounded-circle " width="150px" src="/images/user.png"></img>
                                        {/* <span className="font-weight-bold">{user.firstName + " " + user.lastName}</span><span> </span> */}
                                        <button type="submit" className="button button-contactForm btn-change-picture boxed-btn mt-4">Change Profile</button>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="companyName">Company Name</label>
                                            <input className="form-control valid" name="companyName" id="companyName" type="text" placeholder="Company Name" value={companyName}
                                                onChange={(e) => setcompanyName(e.target.value)}/>
                                                <span className="error-message text-danger">{companyNameError}</span>
                                        </div>
                                        <div className="col-sm-6 mt-4">
                                            <label htmlFor="licenseNumber">License Number</label>
                                            <input className="form-control valid" name="licenseNumber" id="licenseNumber" type="text" placeholder="License Number" value={licenseNumber}
                                                onChange={(e) => setlicenseNumber(e.target.value)} />
                                                <span className="error-message text-danger">{licenseNumberError}</span>
                                        </div>
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control valid" name="email" id="email" type="text" placeholder="Email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                                <span className="error-message text-danger">{emailError}</span>
                                        </div>
                                        <div className="col-sm-6 mt-4">
                                            <label htmlFor="password">Password</label>
                                            <input
                                            className="form-control valid"
                                            name="password"
                                            id="password"
                                            type="text"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span className="error-message text-danger">{passwordError}</span>
                                        </div>
                                        <div className="col-sm-6 mt-4">
                                            <label htmlFor="telephone">Telephone</label>
                                            <input className="form-control valid" name="telephone" id="telephone" type="text" placeholder="Telephone" value={telephone}
                                                onChange={(e) => settelephone(e.target.value)} />
                                                <span className="error-message text-danger">{telephoneError}</span>
                                        </div>
                                         <div className="col-sm-6  mt-4">
                                                <label htmlFor="contactEmail">Contact Email</label>
                                                <input
                                                className="form-control valid"
                                                name="contactEmail"
                                                id="contactEmail"
                                                type="text"
                                                placeholder="Contact Email"
                                                value={contactEmail}
                                                onChange={(e) => setContactEmail(e.target.value)}
                                                />
                                                <span className="error-message text-danger">{contactEmailError}</span>
                                            </div>
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="foundedDate">Founded Date</label>
                                            <input className="form-control" name="foundedDate" id="foundedDate" type="date" placeholder="Select Founded Date" value={foundedDate}
                                            onChange={(e) => setfoundedDate(e.target.value)}/>
                                        </div>

                                        <div className="col-sm-12  mt-4">
                                            <label htmlFor="description">Description</label>
                                            <textarea className="form-control" name="description" id="description" placeholder="Description"></textarea>
                                        </div>


                                        <div className="col-12 mt-6 contact-info">
                                            <h5>Contact Information</h5>
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="address">Address</label>
                                            <input className="form-control valid" name="address" id="address" type="text" placeholder="Address" value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <span className="error-message text-danger">{addressError}</span>
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="country">Country</label>
                                            <input className="form-control valid" name="country" id="country" type="text" placeholder="Country" value={country}
                                                onChange={(e) => setCountry(e.target.value)}/>
                                        </div>

                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="city">City</label>
                                            <input className="form-control valid" name="city" id="city" type="text" placeholder="City"  value={city}
                                                onChange={(e) => setCity(e.target.value)}/>
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="province">Province</label>
                                            <input className="form-control valid" name="province" id="province" type="text" placeholder="Province" value={province}
                                                onChange={(e) => setProvince(e.target.value)} />
                                        </div>

                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="zipCode">Zip Code</label>
                                            <input className="form-control valid" name="zipCode" id="zipCode" type="text" placeholder="Zip Code" value={zipCode}
                                                onChange={(e) => setZipCode(e.target.value)}/>
                                        </div>
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="mobileNumber">Mobile Number</label>
                                            <input
                                            className="form-control valid"
                                            name="mobileNumber"
                                            id="mobileNumber"
                                            type="text"
                                            placeholder="Mobile Number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className="col-12 form-group mt-5">
                                            <button type="submit" className="button button-contactForm button-submit boxed-btn">Send</button>
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

export default withRouter(EmployerRegister);
