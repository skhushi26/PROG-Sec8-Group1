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

    const isEmailExists = await Employer.findOne({ email });

    if (!isEmailExists) {
      const passwordHash = await bcrypt.hash(password, 10);

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
          let token = jwt.sign({ email: credentialsData.email }, "wehvssecretkey", { expiresIn: 600 });
          newHtml = html.replace(
            "{{{link}}}}",
            `http://${req.get("host")}/employer/verify/${token}`
          );
          sendMailHandler("wehvs2023@gmail.com", credentialsData.email, "Email Verification", newHtml);
        }
      });

      res.send(
        responseBuilder(
          null,
          mergedData,
          "Employer registered successfully! Email has been sent to your registered email id for verification.",
          200
        )
      );
    } else {
      res.send(responseBuilder(null, null, "Employer already exists!", 400));
    }
  } catch (error) {
    console.error(error);
    res.send(responseBuilder(error, null, "Something went wrong in registering employer!", 500));
  }
};

exports.getEmployerById = async (req, res) => {
  try {
    const employerId = req.params.id;
    const employer = await Employer.findById(employerId);
    
    if (!employer) {
      res.send(responseBuilder(null, null, "Employer not found", 400));
    } else {
      res.send(responseBuilder(null, employer, "", 200));
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong while fetching employer", 500));
  }
};

exports.getVerifiedEmployer = async (req, res) => {
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
      const employerDetails = await Credentials.findOne({ email: decoded.email });
      if (employerDetails) {
        if (employerDetails.isActive) {
          res.send(responseBuilder(null, null, "Your account is already activated", 200));
        } else {
          await Credentials.findOneAndUpdate(
            { email: decoded.email },
            { $set: { isActive: true } }
          );
          res.send(responseBuilder(null, null, "Your account has activated!", 200));
        }
      } else {
        res.send(responseBuilder(null, null, "Employer not found", 400));
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went in activating Employer", 500));
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

    console.log(`req.body: ${req.body}`);

    // Check if the employer with the given ID exists
    const employerId = new mongoose.Types.ObjectId(id);
    const existingEmployer = await Employer.findById(employerId);

    if (!existingEmployer) {
      res.send(responseBuilder(null, null, "Employer not found", 404));
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
    res.send(
      responseBuilder(null, existingEmployer, "Employer has been updated succesfully!", 200)
    );
  } catch (error) {
    console.error(error);
    res.send(responseBuilder(error, null, "Something went wrong in updating the employer", 500));
  }
};

// exports.login = async (req, res) => {
//   let token = "";
//   try {
//     const { email, password } = req.body;
//     const employerData = await Employer.findOne({ email });
//     if (!employerData) {
//       res.send(responseBuilder(null, null, "Employer not found!", 404));
//     } else {
//       const isPasswordMatch = await bcrypt.compare(password, employerData.password);
//       if (isPasswordMatch) {
//         token = await jwt.sign(
//           { id: employerData._id, role: employerData.role },
//           "wehvsLoginEmployerSecretKey",
//           {
//             expiresIn: "9h",
//           }
//         );
//         res.send(
//           responseBuilder(
//             null,
//             { ...employerData.toJSON(), token },
//             "Employer logged in successfully",
//             200
//           )
//         );
//       } else {
//         res.send(responseBuilder(null, null, "Invalid credentails", 400));
//       }
//     }
//   } catch (error) {
//     res.send(responseBuilder(error, null, "Something went wrong in logging in", 500));
//   }
// };

// exports.getEmployer =  async (req, res) => {
//   try {
//     const id = req.params.id;

//     // Check if the employee with the given ID exists
//     const employee = await Employee.findById(id);

//     if (!employee) {
//       res.send(responseBuilder(null, null, "Employer not found", 404));
//     }

//     // Respond with the employee data
//     // res.status(200).json(employee);
//     res.send(responseBuilder(null, employee, "", 200));

//   } catch (error) {
//     res.send(responseBuilder(error, null, "Something went wrong while fetching the employer", 500));
//   }
// };
