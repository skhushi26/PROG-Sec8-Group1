const Joi = require("joi");
const validateRequest = require("../utils/validation");

function userRequestValidationSchema(req, res, next) {
  const schemaRules = {
    companyName: Joi.string().required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    jobTitle: Joi.string().required(),
    comment: Joi.string().required(),
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
