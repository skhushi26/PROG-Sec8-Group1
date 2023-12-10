const Joi = require("joi");
const validateRequest = require("../utils/validation");

function cancelSubscriptionSchema(req, res, next) {
  const schemaRules = {
    userId: Joi.string().required(),
    paymentTrackingId: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = { cancelSubscriptionSchema };
