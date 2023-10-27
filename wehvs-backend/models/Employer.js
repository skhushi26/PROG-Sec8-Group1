const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
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
    description: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "Employer",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    addressId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    contactId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // resetToken: String,
    // expiryToken: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("employer", EmployerSchema);