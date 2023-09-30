const mongoose = require('mongoose');
const Employers = require("../models/Employers");
const Address = require("../models/Address");
const Contacts = require("../models/Contacts");
const responseBuilder = require("../utils/response");

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
      contactNumber,
      contactEmail,
      mobileNumber,
      faxNumber,
    } = req.body;

    console.log(`req.body: ${req.body}`);
    
    // Check if the employer with the given ID exists
    const employerId = new mongoose.Types.ObjectId(id);
    const existingEmployer = await Employers.findById(employerId);

    if (!existingEmployer) {
      res.send(responseBuilder(null, null, "Employer not found", 404));
    }

    // Update the employer's basic information
    existingEmployer.companyName = companyName;
    existingEmployer.foundedDate =  foundedDate;
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
    const contactData = await Contacts.findById(contactId);
    if (contactData) {
      contactData.contactNumber = contactNumber;
      contactData.contactEmail = contactEmail;
      contactData.mobileNumber = mobileNumber;
      contactData.faxNumber = faxNumber;
      await contactData.save();
    }

    // Respond with a success message
    res.send(responseBuilder(null, null, "Employer has been updated succesfully!", 200));

  } catch (error) {
    console.error(error);
    res.send(responseBuilder(error, null, "Something went wrong in updating the employer", 500));
  }
};