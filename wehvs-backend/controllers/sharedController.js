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
          res.send(
            responseBuilder(null, { ...userData, token }, "User logged in successfully", 200)
          );
        } else {
          res.send(responseBuilder(null, null, "Invalid credentails", 400));
        }
      }
    } else {
      // const employerData = await Employer.findOne({ email });
      if (!details) {
        res.send(responseBuilder(null, null, "Employer not found!", 404));
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
          res.send(
            responseBuilder(
              null,
              { ...employerData, token },
              "Employer logged in successfully",
              200
            )
          );
        } else {
          res.send(responseBuilder(null, null, "Invalid credentails", 400));
        }
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in logging in", 500));
  }
};
