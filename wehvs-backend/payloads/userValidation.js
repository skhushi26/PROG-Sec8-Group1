const Joi = require("joi");
const validateRequest = require("../utils/validation");

function userRegistrationSchema(req, res, next) {
  const schemaRules = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    dateOfBirth: Joi.date(),
    address: Joi.string().required(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string(),
    telephone: Joi.string(),
    contactEmail: Joi.string(),
    mobileNumber: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function userProfileUpdateSchema(req, res, next) {
  const schemaRules = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date(),
    address: Joi.string().required(),
    country: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string(),
    telephone: Joi.string(),
    contactEmail: Joi.string(),
    mobileNumber: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

// Forgot password server side validation
function forgotPasswordSchema(req, res, next) {
  const schemaRules = {
    email: Joi.string().email().required(),
    role: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function resetPasswordSchema(req, res, next) {
  const schemaRules = {
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    sentToken: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = {
  userRegistrationSchema,
  userProfileUpdateSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
