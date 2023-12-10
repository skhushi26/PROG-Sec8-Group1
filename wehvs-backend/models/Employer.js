const mongoose = require("mongoose");
const Address = require("./Address.js");
const Contact = require("./Contact.js");

const EmployerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    foundedDate: {
      type: Date,
      required: true,
    },
    licenseNumber: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    addressId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Address
    },
    contactId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Contact
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employer", EmployerSchema);