const mongoose = require("mongoose");

const JobExperienceLevelSchema = new mongoose.Schema(
  {
    jobExperienceLevel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobexperiencelevel", JobExperienceLevelSchema);
