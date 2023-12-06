const mongoose = require("mongoose");
const Address = require("./Address.js");
const Contact = require("./Contact.js");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    addressId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Address,
    },
    contactId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Contact,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
