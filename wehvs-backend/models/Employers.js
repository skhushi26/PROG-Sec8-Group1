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
      default: "User",
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    address_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employers", EmployerSchema);
