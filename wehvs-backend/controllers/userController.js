const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mongoose = require("mongoose");
const User = require("../models/User");
const Address = require("../models/Address");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");
const Contacts = require("../models/Contacts");

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      dateOfBirth,
      role,
      address,
      city,
      province,
      zipCode,
      telephone,
      contactEmail,
      mobileNumber,
    } = req.body;
    const isEmailExists = await User.findOne({ email });

    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);

      const addressData = await Address.create({
        address,
        city,
        province,
        zipCode,
      });

      const contactData = await Contacts.create({
        telephone,
        contactEmail,
        mobileNumber,
      });

      const userData = await User.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
        mobileNo,
        dateOfBirth,
        role,
        addressId: addressData._id,
        contactId: contactData._id,
      });

      const addressDetails = await addressData.toJSON();
      const userDetails = await userData.toJSON();
      const contactDetails = await contactData.toJSON();

      const mergedData = {
        ...addressDetails,
        ...userDetails,
        ...contactDetails,
      };

      delete mergedData.addressId;
      delete mergedData.contactId;

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
        if (userDetails.isActive) {
          res.send(responseBuilder(null, null, "Your account is already activated", 200));
        } else {
          await User.findOneAndUpdate({ email: decoded.email }, { $set: { isActive: true } });
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
      res.send(responseBuilder(null, null, "User not found!", 404));
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      city,
      province,
      zipCode,
      telephone,
      contactEmail,
      mobileNumber,
    } = req.body;

    const userId = new mongoose.Types.ObjectId(id);
    const existingUser = await User.findById({ _id: userId });

    const profilePhotoPath = req.file ? req.file.path : null;

    if (!existingUser) {
      res.send(responseBuilder(null, null, "User not found", 404));
    } else {
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.email = email;
      existingUser.profilePhoto = profilePhotoPath;
      existingUser.dateOfBirth = dateOfBirth;
      await existingUser.save();

      const addressData = await Address.findById(existingUser.addressId);
      if (addressData) {
        addressData.address = address;
        addressData.city = city;
        addressData.province = province;
        addressData.zipCode = zipCode;
        await addressData.save();
      }

      const contactData = await Contacts.findById(existingUser.contactId);
      if (contactData) {
        contactData.telephone = telephone;
        contactData.contactEmail = contactEmail;
        contactData.mobileNumber = mobileNumber;
        await contactData.save();
      }
      res.send(responseBuilder(null, null, "User details updated successfully", 200));
    }
  } catch (error) {
    console.log("error", error);
    res.send(responseBuilder(error, null, "Something went wrong in updating user details", 500));
  }
};
