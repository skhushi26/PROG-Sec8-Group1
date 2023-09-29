const fs = require("fs");
const Employers = require("../models/Employers");
const Address = require("../models/Address");
const Contacts = require("../models/Contacts");
const LoginCredentials = require("../models/LoginCredentials");

exports.updateEmployer = async (req, res) => {
  try {
    const employerId = req.params.id; 

    const {
      email,
      password,
      companyName,
      foundedDate,
      licenseNumber,
      description,
      address,
      city,
      province,
      zipCode,
      contactNumber,
      contactEmail,
      mobileNumber,
      faxNumber,
    } = req.body;

    // Check if the employer with the given ID exists
    const existingEmployer = await Employer.findById(employerId);

    if (!existingEmployer) {
      return res.status(404).send("Employer not found");
    }

    // Update the employer's basic information
    existingEmployer.email = email;
    existingEmployer.password = password;
    existingEmployer.companyName = companyName;
    existingEmployer.foundedDate = foundedDate;
    existingEmployer.licenseNumber = licenseNumber;
    existingEmployer.description = description;

    // Save the updated employer
    await existingEmployer.save();

    // Update the address associated with the employer
    const addressData = await Address.findById(existingEmployer.addressId);
    if (addressData) {
      addressData.address = address;
      addressData.city = city;
      addressData.province = province;
      addressData.zipCode = zipCode;
      await addressData.save();
    }

    // Update the contact information associated with the employer
    const contactData = await Contacts.findOne({ employerId: employerId });
    if (contactData) {
      contactData.contactNumber = contactNumber;
      contactData.contactEmail = contactEmail;
      contactData.mobileNumber = mobileNumber;
      contactData.faxNumber = faxNumber;
      await contactData.save();
    }

    // Respond with a success message
    res.status(200).send("Employer updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong in updating the employer");
  }
};