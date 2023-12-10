const Joi = require("joi");
const validateRequest = require("../utils/validation");

function employerRegistrationSchema(req, res, next) {
  const schemaRules = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    companyName: Joi.string().required(),
    foundedDate: Joi.date().iso().required(),
    licenseNumber: Joi.string().required(),
    description: Joi.string().allow(''),
    address: Joi.string().required(),
    country: Joi.string().allow(''),
    city: Joi.string().allow(''),
    province: Joi.string().allow(''),
    zipCode: Joi.string().allow(''),
    telephone: Joi.string().required(),
    contactEmail: Joi.string().required(),
    mobileNumber: Joi.string().allow(''),
  }

  validateRequest(req, next, Joi.object(schemaRules));
}

function employerUpdateSchema(req, res, next) {
  const schemaRules = {
    companyName: Joi.string().required(),
    licenseNumber: Joi.string(),
    contactEmail: Joi.string().required(),
    foundedDate: Joi.date().required(),
    address: Joi.string().required(),
    description: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string(),
    telephone: Joi.string().required(),
    mobileNumber: Joi.string(),
  }

  validateRequest(req, next, Joi.object(schemaRules));
}

function employerLoginSchema(req, res, next) {
  const schemaRules = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = { employerRegistrationSchema,employerUpdateSchema, employerLoginSchema };
