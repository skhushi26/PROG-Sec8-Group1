import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateUser = (e) => {
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

    // If all validations pass, you can proceed with further action
    if (valid) {
      // Perform your action here (e.g., submit the form)
    }
  };

  return (
    <div>
      {/* CONTENT */}
      <div className="row d-flex justify-content-center">
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
