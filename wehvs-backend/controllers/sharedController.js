const User = require("../models/User");
const Employer = require("../models/Employer");
const jwt = require("jsonwebtoken");
const responseBuilder = require("../utils/response");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  let token = "";
  try {
    if (role == "User") {
      const userData = await User.findOne({ email });
      if (!userData) {
        res.send(responseBuilder(null, null, "User not found!", 404));
      } else {
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (isPasswordMatch) {
          token = await jwt.sign({ id: userData._id, role }, "wehvsLoginSecretKey", {
            expiresIn: "9h",
          });
          res.send(
            responseBuilder(
              null,
              { ...userData.toJSON(), token },
              "User logged in successfully",
              200
            )
          );
        } else {
          res.send(responseBuilder(null, null, "Invalid credentails", 400));
        }
      }
    } else {
      const employerData = await Employer.findOne({ email });
      if (!employerData) {
        res.send(responseBuilder(null, null, "Employer not found!", 404));
      } else {
        const isPasswordMatch = await bcrypt.compare(password, employerData.password);
        if (isPasswordMatch) {
          token = await jwt.sign({ id: employerData._id, role }, "wehvsLoginEmployerSecretKey", {
            expiresIn: "9h",
          });
          res.send(
            responseBuilder(
              null,
              { ...employerData.toJSON(), token },
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
