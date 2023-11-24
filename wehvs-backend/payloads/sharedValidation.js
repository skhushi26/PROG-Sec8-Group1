const Joi = require("joi");
const validateRequest = require("../utils/validation");

function loginSchema(req, res, next) {
  const schemaRules = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function paymentStatusSchema(req, res, next) {
  const schemaRules = {
    userId: Joi.string().required(),
    paymentTrackingId: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = {
  loginSchema,
  paymentStatusSchema
};
