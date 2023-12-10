const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobTypeId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    employerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    jobExperienceLevelId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobpost", JobPostSchema);
