const mongoose = require("mongoose");

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
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    profilePhoto: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    // role: {
    //   type: String,
    //   default: "User",
    // },
    // isActive: {
    //   type: Boolean,
    //   default: false,
    // },
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

module.exports = mongoose.model("user", UserSchema);
