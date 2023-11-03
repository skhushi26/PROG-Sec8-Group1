const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const User = require("../models/User");
const Employer = require("../models/Employer");
const Address = require("../models/Address");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");
const Contact = require("../models/Contact");
const Credentials = require("../models/Credentials");

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      address,
      city,
      province,
      zipCode,
      telephone,
      contactEmail,
      mobileNumber,
    } = req.body;

    console.log("req.body", req.body);
    const isEmailExists = await Credentials.findOne({ email });
    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);
      const addressData = await Address.create({
        address,
        city,
        province,
        zipCode,
      });
      const contactData = await Contact.create({
        telephone,
        contactEmail,
        mobileNumber,
      });

      const userData = await User.create({
        firstName,
        lastName,
        dateOfBirth,
        addressId: addressData._id,
        contactId: contactData._id,
      });

      const credentialsData = await Credentials.create({
        email,
        password: passwordHash,
        role: "User",
        userId: userData._id,
      });
      console.log("credentialsData", credentialsData);

      const addressDetails = await addressData.toJSON();
      const userDetails = await userData.toJSON();
      const contactDetails = await contactData.toJSON();
      const credentialsDetails = await credentialsData.toJSON();

      const mergedData = {
        ...addressDetails,
        ...userDetails,
        ...contactDetails,
        ...credentialsDetails,
      };

      delete mergedData.addressId;
      delete mergedData.contactId;
      delete mergedData.userId;

      let newHtml = "";
      fs.readFile("views/email.html", { encoding: "utf-8" }, (err, html) => {
        if (err) {
          console.log("err in sending mail", err);
        } else {
          let token = jwt.sign({ email: credentialsData.email }, "wehvssecretkey", {
            expiresIn: 600,
          });
          newHtml = html.replace("{{{link}}}}", `http://${req.get("host")}/users/verify/${token}`);
          sendMailHandler(
            "wehvs2023@gmail.com",
            credentialsData.email,
            "Email Verification",
            newHtml
          );
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

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate("addressId") // Populate the address
      .populate("contactId"); // Populate the contact;

    if (!user) {
      res.send(responseBuilder(null, null, "User not found", 400));
    } else {
      res.send(responseBuilder(null, user, "", 200));
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong while fetching user", 500));
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
      const userDetails = await Credentials.findOne({ email: decoded.email });
      if (userDetails) {
        if (userDetails.isActive) {
          res.send(responseBuilder(null, null, "Your account is already activated", 200));
        } else {
          await Credentials.findOneAndUpdate(
            { email: decoded.email },
            { $set: { isActive: true } }
          );
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

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      firstName,
      lastName,
      dateOfBirth,
      address,
      country,
      city,
      province,
      zipCode,
      telephone,
      mobileNumber,
      contactEmail,
    } = req.body;

    const userId = new mongoose.Types.ObjectId(id);
    const existingUser = await User.findById({ _id: userId });

    const profilePhotoPath = req.file ? req.file.path : null;

    if (!existingUser) {
      res.send(responseBuilder(null, null, "User not found", 404));
    } else {
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      // existingUser.email = email;
      existingUser.profilePhoto = profilePhotoPath;
      existingUser.dateOfBirth = dateOfBirth;
      await existingUser.save();

      const addressData = await Address.findById(existingUser.addressId);
      if (addressData) {
        addressData.address = address;
        addressData.country = country;
        addressData.city = city;
        addressData.province = province;
        addressData.zipCode = zipCode;
        await addressData.save();
      }

      const contactData = await Contact.findById(existingUser.contactId);
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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const rand = uuidv4();
  const isExists = await Credentials.findOne({ email });
  // creates link to reset password
  const link = `http://${req.get("host")}/password/reset/${rand}`;
  let name = "";
  if (isExists.role == "User") {
    // finds user by email ID
    // const user = await User.findOne({ email });

    // If role is "User"
    if (!isExists) {
      // sends response if user doesn't exists
      res.send(responseBuilder(null, null, "User doesn't exists", 400));
    } else {
      name = isExists.firstName;
      // sets the user's resetToken and expiryToken
      isExists.resetToken = rand;
      isExists.expiryToken = Date.now() + 3600000;
      // saves user data
      await isExists.save();
      res.send(
        responseBuilder(null, isExists, "Forgot Password email has been sent to your email id", 200)
      );
    }
  }

  // If role is "Employer"
  else {
    // finds employer by email ID
    // const employer = await Employer.findOne({ email });

    // checks whether employer exists or not
    if (!isExists) {
      // sends response if employer doesn't exists
      res.send(responseBuilder(null, null, "Employer doesn't exists", 400));
    } else {
      name = isExists.companyName;
      // sets the user's resetToken and expiryToken
      isExists.resetToken = rand;
      isExists.expiryToken = Date.now() + 3600000;
      // saves employer data
      await isExists.save();
      res.send(
        responseBuilder(null, isExists, "Forgot Password email has been sent to your email id", 200)
      );
    }
  }

  let newHtml = "";
  fs.readFile("views/forgot-password-email.html", { encoding: "utf-8" }, (err, html) => {
    if (err) {
      console.log("Error in sending mail", err);
    } else {
      newHtml = html.replace("{{{resetlink}}}", `http://${req.get("host")}/password/reset/${rand}`);
      newHtml = newHtml.replace("{{{name}}}", name);
      sendMailHandler("wehvs2023@gmail.com", email, "Reset Password", newHtml);
    }
  });
};

exports.ResetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, sentToken } = req.body;
    // finds user by resetToken and expiryToken greater than current date
    const user = await User.findOne({
      resetToken: sentToken,
      expiryToken: { $gt: Date.now() },
    });
    // checks if user exists or not
    if (!user) {
      // sends response if user doesn't exists
      return res.send(response(null, null, "User not found", 500));
    }
    // checks whether newPassword and confirmPassword matches or not
    if (newPassword === confirmPassword) {
      // bcrypts the newPassword
      const hashPassword = await bcrypt.hash(newPassword, 10);
      // finds user by _id and updates currentpassword with the new password
      const updatedData = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            password: hashPassword,
            resetToken: null,
            expiryToken: null,
          },
        },
        {
          new: true,
          upsert: true,
          timestamps: { createdAt: false, updatedAt: true },
        }
      );
      const fromMail = `${process.env.SENDER_EMAIL}`;
      const toMail = `${user.email}`;
      const subject = "Email Verification";
      const text = "Hello,<br> Your password has been updated.<br>";
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
          user: `${process.env.SENDER_EMAIL}`,
          pass: `${process.env.SENDER_PASSWORD}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      const mailOptions = {
        from: fromMail,
        to: toMail,
        subject,
        html: text,
      };
      transporter.sendMail(mailOptions, (error, response1) => {
        if (error) {
          console.log(error);
        }
        console.log(response1);
      });

      // eslint-disable-next-line quote-props
      res.send(response(null, { user: updatedData }, "Password Updated", 200));
    } else {
      // sends response if password and confirm password doesn't match
      res.send(response(null, null, "Password and confirm password doesn't match", 500));
    }
  } catch (error) {
    // sends response if error occurred in updating password
    res.send(response(error, null, "Something went wrong!!Can't update", 500));
  }
  return null;
};
