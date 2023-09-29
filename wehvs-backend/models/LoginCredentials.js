const mongoose = require("mongoose");

const LoginCredentialsSchema = new mongoose.Schema(
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
    userId: {
      type: mongoose.Types.ObjectId,
      default: ""
    },
    employerId: {
      type: mongoose.Types.ObjectId,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginCredentials", LoginCredentialsSchema);
