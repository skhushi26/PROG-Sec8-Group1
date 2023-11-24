const mongoose = require("mongoose");

const JobTypeSchema = new mongoose.Schema(
  {
    jobType: {
      type: String,
      enum: ["Contract", "FullTime", "PartTime"],
      default: "FullTime",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobtype", JobTypeSchema);
