import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DOMAIN_URI } from "../config";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [resetMessage, setResetMessage] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const validateUser = async (e) => {
    e.preventDefault();

    let valid = true;

    // Password validation
    if (password === "") {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      try {
        const response = await fetch(`${DOMAIN_URI}/users/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password,
            confirmPassword,
            sentToken: token, // Use the token from URL params
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message); // Set success message
          setSuccess(true);
          // Further actions on successful password reset
        } else {
          setMessage(data.message); // Set error message
          setSuccess(false);
        }
      } catch (error) {
        console.error("Error updating password:", error.message);
        setMessage("Something went wrong! Can't update"); // Set generic error message\
        setSuccess(false);
      }
    }
  };

  return (
    <div>
      {/* CONTENT */}
      <div className="row d-flex justify-content-center">
        {/* <span className="alert alert-success">{resetMessage}</span> */}
        <div className="col-lg-8 mt-5">
          <form
            name="resetForm"
            className="form-contact contact_form"
            method="post"
            id="contactForm"
            onSubmit={validateUser}
          >
            <div className="row">
              <div className="col-12">
                <h2 className="contact-title">Reset Password</h2>
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
              <div className="col-sm-10 m-auto mb-5">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="error-message text-danger">{passwordError}</span>
                </div>
              </div>
              <div className="col-sm-10 m-auto mb-5">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span className="error-message text-danger">{confirmPasswordError}</span>
                </div>
              </div>
            </div>
            <div className="col-12 form-group mt-2 mb-2">
              <button type="submit" className="button button-contactForm button-login boxed-btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
