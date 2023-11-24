import React, { useState } from "react";
import axios from "axios";
import FooterMenu from "./Footer";


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
                Reset password link will be send to the entered email id. This link will be
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
      <FooterMenu />
    </div>
  );
};

export default ForgotPassword;
