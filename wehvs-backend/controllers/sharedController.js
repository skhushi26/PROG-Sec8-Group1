const User = require("../models/User");
const Employer = require("../models/Employer");
const jwt = require("jsonwebtoken");
const responseBuilder = require("../utils/response");
const bcrypt = require("bcrypt");
const Credentials = require("../models/Credentials");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let details = await Credentials.findOne({ email });
  let token = "";
  try {
    if (details.role == "User") {
      // const userData = await User.findOne({ email });
      if (!details) {
        res.send(responseBuilder(null, null, "User not found!", 404));
      } else {
        const isPasswordMatch = await bcrypt.compare(password, details.password);
        if (isPasswordMatch) {
          token = await jwt.sign(
            { id: details.userId, role: details.role },
            "wehvsLoginSecretKey",
            {
              expiresIn: "9h",
            }
          );
          let userData = await details.toJSON();
          delete userData.password;
          responseBuilder(res, null, { ...userData, token }, "User logged in successfully", 200);
        } else {
          responseBuilder(res, null, null, "Invalid credentails", 400);
        }
      }
    } else {
      // const employerData = await Employer.findOne({ email });
      if (!details) {
        responseBuilder(res, null, null, "Employer not found!", 404);
      } else {
        const isPasswordMatch = await bcrypt.compare(password, details.password);
        if (isPasswordMatch) {
          token = await jwt.sign(
            { id: details.employerId, role: details.role },
            "wehvsLoginEmployerSecretKey",
            {
              expiresIn: "9h",
            }
          );
          let employerData = await details.toJSON();
          delete employerData.password;
          responseBuilder(
            res,
            null,
            { ...employerData, token },
            "Employer logged in successfully",
            200
          );
        } else {
          responseBuilder(res, null, null, "Invalid credentails", 400);
        }
      }
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in logging in", 500);
  }
};

exports.getVerified = async (req, res) => {
  try {
    const token = req.params.token;
    let decoded = null;
    try {
      decoded = jwt.verify(token, "wehvssecretkey");
    } catch (error) {
      console.log("error", error);
    }

    if (!decoded) {
      responseBuilder(res, null, null, "Invalid link!", 400);
    } else {
      const userDetails = await Credentials.findOne({ email: decoded.email });
      if (userDetails) {
        if (userDetails.isActive) {
          responseBuilder(res, null, null, "Your account is already activated", 400);
        } else {
          await Credentials.findOneAndUpdate(
            { email: decoded.email },
            { $set: { isActive: true } }
          );
          responseBuilder(res, null, null, "Your account has activated!", 200);
        }
      } else {
        responseBuilder(res, null, null, "Account not found", 400);
      }
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went in activating the account", 500);
  }
};
