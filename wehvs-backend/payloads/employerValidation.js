const Joi = require("joi");
const validateRequest = require("../utils/validation");

function employerUpdateSchema(req, res, next) {
  const schemaRules = {
    companyName: Joi.string().required(),
    foundedDate: Joi.date().required(),
    licenseNumber: Joi.string(),
    description: Joi.string(),
    address: Joi.string().required(),
    city: Joi.string(),
    province: Joi.string(),
    zipCode: Joi.string(),
    contactNumber: Joi.string().required(),
    contactEmail: Joi.string().required(),
    mobileNumber: Joi.string(),
    faxNumber: Joi.string()
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

module.exports = { employerUpdateSchema, employerLoginSchema };
