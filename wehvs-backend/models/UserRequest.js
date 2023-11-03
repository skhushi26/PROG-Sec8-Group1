const mongoose = require("mongoose");
const User = require("./User.js");

const UserRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    },
    employerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    requestStatus: {
      type: String,
      enum: ["Pending", "Approved", "Deny"],
      default: "Pending",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    requestDate: {
      type: Date,
      required: true,
    },
    lastUpdateDate: {
      type: Date,
      default: ""
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userrequest", UserRequestSchema);
