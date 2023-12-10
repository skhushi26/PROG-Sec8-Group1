const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const mongoose = require("mongoose");
const Employer = require("../models/Employer");
const Address = require("../models/Address");
const Contact = require("../models/Contact");
const Credentials = require("../models/Credentials");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");

exports.registerEmployer = async (req, res) => {
  try {
    const {
      email,
      password,
      companyName,
      foundedDate,
      licenseNumber,
      description,
      address,
      city,
      country,
      province,
      zipCode,
      telephone,
      contactEmail,
      mobileNumber,
    } = req.body;

    let profilePhotoPath = "";
    const isEmailExists = await Employer.findOne({ email });

    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);
      profilePhotoPath = req.file ? req.file.path : "";
      const addressData = await Address.create({
        address,
        city,
        country,
        province,
        zipCode,
      });

      const contactData = await Contact.create({
        telephone,
        contactEmail,
        mobileNumber,
      });

      const employerData = await Employer.create({
        companyName,
        foundedDate,
        licenseNumber,
        description,
        profilePhoto: profilePhotoPath,
        addressId: addressData._id,
        contactId: contactData._id,
      });

      const credentialsData = await Credentials.create({
        email,
        password: passwordHash,
        role: "Employer",
        userId: employerData._id,
      });

      const addressDetails = await addressData.toJSON();
      const employerDetails = await employerData.toJSON();
      const contactDetails = await contactData.toJSON();
      const credentialsDetails = await credentialsData.toJSON();

      const mergedData = {
        ...addressDetails,
        ...employerDetails,
        ...contactDetails,
        ...credentialsDetails,
      };

      delete mergedData.addressId;
      delete mergedData.contactId;
      delete mergedData.employerId;

      let newHtml = "";
      fs.readFile("views/email.html", { encoding: "utf-8" }, (err, html) => {
        if (err) {
          console.log("err in sending mail", err);
        } else {
          let token = jwt.sign({ email: credentialsData.email }, "wehvssecretkey", {
            expiresIn: 600,
          });
          newHtml = html.replace("{{{link}}}}", `http://${req.get("host")}/shared/verify/${token}`);
          sendMailHandler(
            "wehvs2023@gmail.com",
            credentialsData.email,
            "Email Verification",
            newHtml
          );
        }
      });

      responseBuilder(
        res,
        null,
        mergedData,
        "Employer registered successfully! Email has been sent to your registered email id for verification.",
        200
      );
    } else {
      responseBuilder(res, null, null, "Employer already exists!", 400);
    }
  } catch (error) {
    console.error(error);
    responseBuilder(res, error, null, "Something went wrong in registering employer!", 500);
  }
};

exports.getEmployerById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const employer = await Employer.findById(employerId)
    .populate("addressId") // Populate the address
    .populate("contactId"); // Populate the contact;

    if (employer == null) {
      responseBuilder(res, null, null, "Employer not found", 400);
    } else {
      const credentials = await Credentials.findOne({ userId: employerId });
      if (!credentials) {
        responseBuilder(res, null, employer, "Credentials not found", 400);
      } else {
        const userData = {
          ...employer.toObject(), // Spread the employer object
          email: credentials.email,
        };
        responseBuilder(res, null, userData, "", 200);
      }
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong while fetching employer", 500);
  }
};


exports.updateEmployer = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      companyName,
      foundedDate,
      licenseNumber,
      description,
      address,
      city,
      province,
      zipCode,
      telephone,
      contactEmail,
      mobileNumber,
    } = req.body;


    // Check if the employer with the given ID exists
    const employerId = new mongoose.Types.ObjectId(id);
    const existingEmployer = await Employer.findById(employerId);

    const profilePhotoPath = req.file ? req.file.path : null;
    console.log("profilePhotoPath", profilePhotoPath);
    
    if (!existingEmployer) {
      res.send(responseBuilder(null, null, "Employer not found", 404));
    } else {
      if (profilePhotoPath && existingEmployer.profilePhoto !== profilePhotoPath) {
        if (existingEmployer.profilePhoto) {
          fs.unlink(existingEmployer.profilePhoto, (err) => {
            if (err) {
              console.log("Error removing file:", err);
            }
          });
        }
        existingEmployer.profilePhoto = profilePhotoPath;
      }
    }

    // Update the employer's basic information
    existingEmployer.companyName = companyName;
    existingEmployer.foundedDate = foundedDate;
    existingEmployer.licenseNumber = licenseNumber;
    existingEmployer.description = description;

    // Save the updated employer
    await existingEmployer.save();

    // Update the address associated with the employer
    const addressId = new mongoose.Types.ObjectId(existingEmployer.addressId);
    const addressData = await Address.findById(addressId);
    if (addressData) {
      addressData.address = address;
      addressData.city = city;
      addressData.province = province;
      addressData.zipCode = zipCode;
      await addressData.save();
    }

    // Update the contact information associated with the employer
    const contactId = new mongoose.Types.ObjectId(existingEmployer.contactId);
    const contactData = await Contact.findById(contactId);
    if (contactData) {
      contactData.telephone = telephone;
      contactData.contactEmail = contactEmail;
      contactData.mobileNumber = mobileNumber;
      await contactData.save();
    }

    // Respond with a success message

    responseBuilder(res, null, existingEmployer, "Employer has been updated succesfully!", 200);
  } catch (error) {
    console.error(error);
    responseBuilder(res, error, null, "Something went wrong in updating the employer", 500);
  }
};
