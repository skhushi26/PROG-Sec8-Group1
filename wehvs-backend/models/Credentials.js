const mongoose = require("mongoose");

const CredentialsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    paymentTrackingId: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    resetToken: {
      type: String,
    },
    expiryToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("credential", CredentialsSchema);
