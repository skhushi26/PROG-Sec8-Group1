const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
const Address = require("../models/Address");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");

exports.registerUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_no,
      date_of_birth,
      role,
      address,
      city,
      province,
      zip_code,
    } = req.body;
    const isEmailExists = await User.findOne({ email });

    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);

      const addressData = await Address.create({
        address,
        city,
        province,
        zip_code,
      });

      const userData = await User.create({
        first_name,
        last_name,
        email,
        password: passwordHash,
        mobile_no,
        date_of_birth,
        role,
        address_id: addressData._id,
      });

      const addressDetails = await addressData.toJSON();
      const userDetails = await userData.toJSON();

      const mergedData = {
        ...addressDetails,
        ...userDetails,
      };

      delete mergedData.address_id;

      let newHtml = "";
      fs.readFile("views/email.html", { encoding: "utf-8" }, (err, html) => {
        if (err) {
          console.log("err in sending mail", err);
        } else {
          let token = jwt.sign({ email: userData.email }, "wehvssecretkey", { expiresIn: 600 });
          newHtml = html.replace("{{{link}}}}", `http://${req.get("host")}/users/verify/${token}`);
          sendMailHandler("wehvs2023@gmail.com", userData.email, "Email Verification", newHtml);
        }
      });

      res.send(
        responseBuilder(
          null,
          mergedData,
          "User registered successfully!Email has been sent to your registered email id for verification.",
          200
        )
      );
    } else {
      res.send(responseBuilder(null, null, "User already exists!", 400));
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in registering user!", 500));
  }
};

exports.getVerifiedUser = async (req, res) => {
  try {
    const token = req.params.token;
    let decoded = null;
    try {
      decoded = jwt.verify(token, "wehvssecretkey");
    } catch (error) {
      console.log("error", error);
    }

    if (!decoded) {
      res.send(responseBuilder(null, null, "Invalid link!", 400));
    } else {
      const userDetails = await User.findOne({ email: decoded.email });
      if (userDetails) {
        if (userDetails.is_active) {
          res.send(responseBuilder(null, null, "Your account is already activated", 200));
        } else {
          await User.findOneAndUpdate({ email: decoded.email }, { $set: { is_active: true } });
          res.send(responseBuilder(null, null, "Your account has activated!", 200));
        }
      } else {
        res.send(responseBuilder(null, null, "User not found", 400));
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went in activating user", 500));
  }
};

exports.login = async (req, res) => {
  let token = "";
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      res.send(responseBuilder(null, null, "User not found!", 400));
    } else {
      const isPasswordMatch = await bcrypt.compare(password, userData.password);
      if (isPasswordMatch) {
        token = await jwt.sign({ id: userData._id, role: userData.role }, "wehvsLoginSecretKey", {
          expiresIn: "9h",
        });
        res.send(
          responseBuilder(null, { ...userData.toJSON(), token }, "User logged in successfully", 200)
        );
      } else {
        res.send(responseBuilder(null, null, "Invalid credentails", 400));
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in logging in", 500));
  }
};