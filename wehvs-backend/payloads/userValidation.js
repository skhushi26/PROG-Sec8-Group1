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
    email: Joi.string().email().required(),
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

function loginSchema(req, res, next) {
  const schemaRules = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = { userRegistrationSchema, loginSchema, userProfileUpdateSchema };
