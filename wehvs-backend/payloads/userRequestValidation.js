const Joi = require("joi");
const validateRequest = require("../utils/validation");

function userRequestValidationSchema(req, res, next) {
  const schemaRules = {
    userId:  Joi.string().required(),
    companyName: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    jobTitle: Joi.string().required(),
    comment: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function UserRequestApproveDenySchema(req, res, next) {
  const schemaRules = {
    comment: Joi.string().allow("").optional(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = {
  UserRequestApproveDenySchema,
  userRequestValidationSchema,
};
