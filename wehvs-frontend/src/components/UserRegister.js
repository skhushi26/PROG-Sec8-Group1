import React, { useState } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const role = "User";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [contactEmailError, setContactEmailError] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const validateUserRegister = async (e) => {
    e.preventDefault();

    let valid = true;

    // First Name validation
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Last Name validation
    if (lastName.trim() === "") {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
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
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // Date of Birth validation
    const currentDate = new Date();
    const inputDate = new Date(dateOfBirth);
    const age = currentDate.getFullYear() - inputDate.getFullYear();
    if (age < 14) {
      setDateOfBirthError("You must be at least 14 years old");
      valid = false;
    } else {
      setDateOfBirthError("");
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
      setTelephoneError("Telephone is required");
      valid = false;
    } else {
      setTelephoneError("");
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
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("province", province);
        formData.append("zipCode", zipCode);
        formData.append("telephone", telephone);
        formData.append("contactEmail", contactEmail);
        formData.append("mobileNumber", mobileNumber);
        const response = await axios.post("http://localhost:3333/users/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart form data
          },
        });
        console.log("response", response);
        if (response.data.statusCode === 200) {
          setMessage(response.data.message);
          // navigate("/login", { state: { message: response.data.message } });
          setSuccess(true);
        } else if (response.data.statusCode === 400) {
          setMessage(response.data.message);
          setSuccess(false);
        } else {
          setMessage(response.data.message);
          setSuccess(false);
        }
      } catch (error) {
        console.log("error>: " + error);
        setMessage("Something went wrong in sending email verification link");
        setSuccess(false);
      }
    }
  };

  //   constructor() {
  //     super();
  //     this.state = {
  //       selectedCountry: null,
  //       selectedCity: null,
  //       countries: [
  //         { value: "usa", label: "USA" },
  //         { value: "canada", label: "Canada" },
  //         // Add more countries here
  //       ],
  //       cities: [
  //         { value: "new-york", label: "New York", country: "usa" },
  //         { value: "los-angeles", label: "Los Angeles", country: "usa" },
  //         { value: "toronto", label: "Toronto", country: "canada" },
  //         { value: "vancouver", label: "Vancouver", country: "canada" },
  //         // Add more cities here
  //       ],
  //     };
  //   }

  //   handleCountryChange = (selectedOption) => {
  //     this.setState({ selectedCountry: selectedOption, selectedCity: null });
  //   };

  //   handleCityChange = (selectedOption) => {
  //     this.setState({ selectedCity: selectedOption });
  //   };

  //   componentDidMount() {
  //     // Fetch countries from your backend API
  //     axios.get('https://restcountries.com/v3.1/all') // Adjust the URL if needed
  //       .then((response) => {
  //         console.log("CountryOptions response: " + response);

  //         const countryOptions = response.data.map((country) => ({
  //           value: country.value,
  //           label: country.label,
  //         }));

  //         console.log("CountryOptions: " + countryOptions);
  //         this.setState({ countries: countryOptions });
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching countries:', error);
  //       });
  //   }

  //   render() {
  // const { countries, cities, selectedCountry, selectedCity } = this.state;

  return (
    <div>
      {/* CONTENT */}
      <div className="row container">
        <div className="col-lg-12">
          <form
            className="form-contact contact_form"
            method="post"
            id="contactForm"
            onSubmit={validateUserRegister}
          >
            <div className="col-12">
              <h2 className="contact-title">User Register</h2>
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
                      src="/images/user.png"
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                      className="form-control valid"
                      name="firstName"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span className="error-message text-danger">{firstNameError}</span>
                  </div>
                  <div className="col-sm-6 mt-4">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="form-control valid"
                      name="lastName"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <span className="error-message text-danger">{lastNameError}</span>
                  </div>
                  <div className="col-sm-6  mt-4">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control valid"
                      name="email"
                      id="email"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      className="form-control"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      type="date"
                      placeholder="Select Date of Birth"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <span className="error-message text-danger">{dateOfBirthError}</span>
                  </div>
                  <div className="col-12 mt-6 contact-info">
                    <h5>Contact Information</h5>
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="address">Address</label>
                    <input
                      className="form-control valid"
                      name="address"
                      id="address"
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <span className="error-message text-danger">{addressError}</span>
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="city">City</label>
                    <input
                      className="form-control valid"
                      name="city"
                      id="city"
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="province">Province</label>
                    <input
                      className="form-control valid"
                      name="province"
                      id="province"
                      type="text"
                      placeholder="Province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      className="form-control valid"
                      name="zipCode"
                      id="zipCode"
                      type="text"
                      placeholder="Zip Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6  mt-4">
                    <label htmlFor="telephone">Telephone</label>
                    <input
                      className="form-control valid"
                      name="telephone"
                      id="telephone"
                      type="text"
                      placeholder="Telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
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
                    <button
                      type="submit"
                      className="button button-contactForm button-submit boxed-btn"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* FOOTER */}
      <FooterMenu />
    </div>
  );
  //   }
};

export default withRouter(UserRegister);
