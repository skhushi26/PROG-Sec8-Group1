const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    contactNumber: {
      type: String,
      required: true
    },
    contactEmail: {
      type: String,
        required: true
    },
    mobileNumber: {
      type: String,
      default: ""
    },
    faxNumber: {
      type: String,
      default: ""
    },
    employerId: {
      type: mongoose.Types.ObjectId,
      default: "",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contacts", ContactSchema);
