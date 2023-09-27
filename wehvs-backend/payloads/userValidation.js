const Joi = require("joi");
const validateRequest = require("../utils/validation");

function userRegistrationSchema(req, res, next) {
  const schemaRules = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mobile_no: Joi.number(),
    date_of_birth: Joi.date(),
    address: Joi.string().required(),
    city: Joi.string(),
    province: Joi.string(),
    zip_code: Joi.string(),
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

module.exports = { userRegistrationSchema, loginSchema };
