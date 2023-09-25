const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: Number,
      default: null,
    },
    date_of_birth: {
      type: Date,
      default: null,
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

module.exports = mongoose.model("user", UserSchema);
