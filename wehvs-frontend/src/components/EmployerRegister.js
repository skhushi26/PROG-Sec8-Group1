import React, { useState } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link, useNavigate } from "react-router-dom";
import FooterMenu from "./Footer";
import axios from "axios";

const EmployerRegister = () => {
  const [companyName, setcompanyName] = useState("");
  const [licenseNumber, setlicenseNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, settelephone] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [companyNameError, setcompanyNameError] = useState("");
  const [foundedDateError, setfoundedDateError] = useState("");
  const [licenseNumberError, setlicenseNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [telephoneError, settelephoneError] = useState("");
  const [contactEmailError, setContactEmailError] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

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


    // Founded Date validation
    const inputDate = new Date(foundedDate);
    if (isNaN(inputDate)) {
      setfoundedDateError("Founded Date is not a valid date");
      valid = false;
    } else {
      setfoundedDateError("");
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
        const formData = new FormData();
        formData.append("profilePhoto", selectedFile);
        formData.append("companyName", companyName);
        formData.append("licenseNumber", licenseNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("foundedDate", foundedDate);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("province", province);
        formData.append("zipCode", zipCode);
        formData.append("telephone", telephone);
        formData.append("contactEmail", contactEmail);
        formData.append("mobileNumber", mobileNumber);

        const response = await axios.post("http://localhost:3333/employers/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart form data
          },
        });

        console.log("response", response);
        if (response.data.statusCode === 200) {
          setMessage(response.data.message);
          // navigate("/login", { state: { successMessage: response.data.message } });
          resetForm();
          setSuccess(true);
        } else if (response.data.statusCode === 400) {
          setMessage(response.data.message);
          setSuccess(false);
        } else {
          setMessage(response.data.message);
          setSuccess(false);
        }
      } catch (error) {
        console.error(error.response.data.message);
        setMessage("Something went wrong while registering!");
        setSuccess(false);
      }
    }
  };


  const resetForm = () => {
    setcompanyName("");
    setlicenseNumber("");
    setEmail("");
    setPassword("");
    settelephone("");
    setFoundedDate("");
    setDescription("");
    setAddress("");
    setCity("");
    setProvince("");
    setCountry("");
    setZipCode("");
    setContactEmail("");
    setMobileNumber("");
    setSelectedFile(null);
  }

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
                  {selectedFile ? (
                    <img
                      className="rounded-circle"
                      width="150px"
                      src={URL.createObjectURL(selectedFile)}
                      alt="Profile Photo"
                    />
                  ) : (
                    <img
                      className="rounded-circle"
                      width="150px"
                      height="150px"
                      src="/images/default-profile.png"
                      alt="Placeholder"
                    />
                  )}
                  <label
                    htmlFor="fileInput"
                    className="button button-contactForm btn-change-picture boxed-btn mt-4"
                  >
                    Upload profile photo
                    {/* Actual file input, visually hidden */}
                    <input
                      type="file"
                      id="fileInput"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              <div className="col-md-8">
                <div className="row">
                  <div className="col-sm-6  mt-4">
                    <label htmlFor="companyName">Company Name</label>
                    <input className="form-control valid" name="companyName" id="companyName" type="text" placeholder="Company Name" value={companyName}
                      onChange={(e) => setcompanyName(e.target.value)} />
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
                      type="password"
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
                      onChange={(e) => setFoundedDate(e.target.value)} />
                    <span className="error-message text-danger">{foundedDateError}</span>
                  </div>

                  <div className="col-sm-12  mt-4">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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
                      onChange={(e) => setCountry(e.target.value)} />
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="city">City</label>
                    <input className="form-control valid" name="city" id="city" type="text" placeholder="City" value={city}
                      onChange={(e) => setCity(e.target.value)} />
                  </div>


                  <div className="col-sm-6  mt-4">
                    <label htmlFor="province">Province</label>
                    <input className="form-control valid" name="province" id="province" type="text" placeholder="Province" value={province}
                      onChange={(e) => setProvince(e.target.value)} />
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input className="form-control valid" name="zipCode" id="zipCode" type="text" placeholder="Zip Code" value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)} />
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
      </div >
      {/* FOOTER */}
      < FooterMenu />

    </div >
  );
  //   }
};

export default withRouter(EmployerRegister);

