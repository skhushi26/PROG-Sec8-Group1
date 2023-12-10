import React, { useState } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    errorMessage: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const validateUser = (e) => {
    e.preventDefault();
    const { email, password } = state;
    let valid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (email === "") {
      setState({ ...state, emailError: "Email is required" });
      valid = false;
    } else if (!email.match(emailPattern)) {
      setState({ ...state, emailError: "Invalid email address" });
      valid = false;
    } else {
      setState({ ...state, emailError: "" });
    }

    // Password validation
    if (password === "") {
      setState({ ...state, passwordError: "Password is required" });
      valid = false;
    } else if (password.length < 8) {
      setState({ ...state, passwordError: "Password must be at least 8 characters long" });
      valid = false;
    } else {
      setState({ ...state, passwordError: "" });
    }

    if (valid) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const { email, password } = state;

    try {
      const response = await axios.post("http://localhost:3333/shared/login", { email, password });
      if (response.data.statusCode === 200) {
        // Login successful, store the token in localStorage or a global state
        const result = response.data.data;
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("userRole", result.role);
        localStorage.setItem("isPaymentDone", result.isPaymentDone ?? false);
        localStorage.setItem("paymentTrackingId", result.paymentTrackingId);
        // Redirect to the dashboard page
        navigate("/");
      } else {
        setState({ ...state, errorMessage: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      setState({ ...state, errorMessage: "Something went wrong, please try again!" });
    }
  };

  const { errorMessage, emailError, passwordError } = state;

  return (
    <div>
      {/* CONTENT */}
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8 mt-1">
          <form
            className="form-contact contact_form"
            onSubmit={validateUser}
            method="post"
            id="contactForm"
          >
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Login</h2>
              </div>
              <div className="col-sm-10 m-auto">
              {/* {successMessage !== null && (
                  <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                    { successMessage }
                  </div>
                )} */}
                {errorMessage && (
                  <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                    {errorMessage}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className={`form-control ${emailError && "is-invalid"}`}
                    name="email"
                    id="email"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  {emailError && (
                    <div className="invalid-feedback">
                      <span className="text-danger float-left">{emailError}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-10 m-auto">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className={`form-control ${passwordError && "is-invalid"}`}
                    name="password"
                    id="password"
                    type="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                  <p className="forgotpassword"><a href="/forgot-password">Forgot Password?</a></p>
                  {passwordError && (
                    <div className="invalid-feedback">
                      <span className="text-danger float-left">{passwordError}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 form-group mt-2 mb-2">
              <button type="submit" className="button button-contactForm button-login boxed-btn">
                Login
              </button>
            </div>
            <div className="mt-4">
              <p className="mb-0">Don't have an account yet? Sign Up here!</p>
              <p className="mt-0">
                <a href="/employer/register">Register as Employer</a> |{" "}
                <a href="/user/register">Register as User</a>
              </p>
            </div>
          </form>
        </div>
      </div>
     {/* FOOTER */}
      <FooterMenu />
    </div>
  );
};

export default withRouter(Login);
