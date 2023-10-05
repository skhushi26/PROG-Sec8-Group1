const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    telephone: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contacts", ContactSchema);
