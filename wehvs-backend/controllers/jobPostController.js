const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserRequest = require("../models/UserRequest");
const Employer = require("../models/Employer");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const JobPost = require("../models/JobPost");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");
const JobType = require("../models/JobType");
const JobExperienceLevel = require("../models/JobExperienceLevel");
const Address = require("../models/Address");

exports.addJobPost = async (req, res) => {
  try {
    const { jobTitle, jobDescription, jobTypeId, addressId, jobExperienceLevelId } = req.body;
    const userId = req.user.id;
    const employer = await Employer.findById({ _id: userId });

    if (!employer) {
      responseBuilder(res, null, null, "Employer not found", 400);
    }

    const newJobPost = await JobPost.create({
      jobTitle,
      jobDescription,
      jobTypeId,
      addressId,
      jobExperienceLevelId,
      employerId: employer._id,
    });

    responseBuilder(res, null, newJobPost, "Job post added successfully", 200);
  } catch (error) {
    responseBuilder(
      res,
      error,
      null,
      "Something went wrong in adding job post. Please try again!",
      500
    );
  }
};

exports.findJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const employer = await Employer.findById({ _id: userId });
    const jobPost = await JobPost.findOne({ _id: id, isActive: true, employerId: employer._id });

    if (!jobPost) {
      return responseBuilder(res, null, null, "Job post doesn't exist", 400);
    }

    const jobTypeData = await JobType.findById({ _id: jobPost.jobTypeId });
    const jobExperienceLevelData = await JobExperienceLevel.findById({
      _id: jobPost.jobExperienceLevelId,
    });
    const addressData = await Address.findById({ _id: jobPost.addressId });

    // Extracting required data from Mongoose documents
    const jobTypeDetail = jobTypeData ? jobTypeData.toObject() : {};
    const jobExperienceLevelDetail = jobExperienceLevelData
      ? jobExperienceLevelData.toObject()
      : {};
    const addressDetail = addressData ? addressData.toObject() : {};

    // Creating a clean object without Mongoose-specific properties
    const mergedData = {
      jobTitle: jobPost.jobTitle,
      jobDescription: jobPost.jobDescription,
      isActive: jobPost.isActive,
      createdAt: jobPost.createdAt,
      updatedAt: jobPost.updatedAt,
      jobExperienceLevel: jobExperienceLevelDetail.jobExperienceLevel || "",
      jobType: jobTypeDetail.jobType || "",
      address: addressDetail.address || "",
      city: addressDetail.city || "",
      province: addressDetail.province || "",
      zipCode: addressDetail.zipCode || "",
    };

    return responseBuilder(res, null, mergedData, "Job post data found successfully", 200);
  } catch (error) {
    return responseBuilder(
      res,
      error,
      null,
      "Something went wrong while fetching job post data",
      500
    );
  }
};

exports.updateJobPost = async (req, res) => {
  try {
    const id = req.params.id;
    const { jobTitle, jobDescription, jobTypeId, addressId, jobExperienceLevelId } = req.body;
    if (!id) {
      responseBuilder(res, null, null, "Job posting not found!", 400);
    } else {
      const updatedJobPost = await JobPost.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            jobTitle,
            jobDescription,
            jobTypeId,
            addressId,
            jobExperienceLevelId,
          },
        }
      );
      responseBuilder(res, null, updatedJobPost.toJSON(), "Job Posting updated successfully", 200);
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in updating job posting", 500);
  }
};

exports.getAllExperienceLevels = async (req, res) => {
  try {
    const allExperienceLevelsDetails = await JobExperienceLevel.find();
    responseBuilder(
      res,
      null,
      allExperienceLevelsDetails,
      "All experience levels data found successfully",
      200
    );
  } catch (error) {
    responseBuilder(
      res,
      error,
      null,
      "Something went wrong in finding all experience levels data",
      500
    );
  }
};

exports.getAllJobTypes = async (req, res) => {
  try {
    const allJobTypeDetails = await JobType.find();
    responseBuilder(res, null, allJobTypeDetails, "All job types data found successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in finding all job types data", 500);
  }
};
