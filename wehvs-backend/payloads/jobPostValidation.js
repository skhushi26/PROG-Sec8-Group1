const Joi = require("joi");
const validateRequest = require("../utils/validation");

function jobPostSchema(req, res, next) {
  const schemaRules = {
    employerId: Joi.string(),
    jobTitle: Joi.string().required(),
    jobDescription: Joi.string().required(),
    salary: Joi.string().required(),
    jobTypeId: Joi.string().required(),
    jobExperienceLevelId: Joi.string().required(),
    address: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = {
  jobPostSchema,
};
