const Joi = require("joi");
const validateRequest = require("../utils/validation");

function UserRequestApproveDenySchema(req, res, next) {
  const schemaRules = {
    comment: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

module.exports = {
  UserRequestApproveDenySchema,
};
