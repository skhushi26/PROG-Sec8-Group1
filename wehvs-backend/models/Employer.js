const mongoose = require("mongoose");

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
    description: {
      type: String,
      default: null,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("employer", EmployerSchema);