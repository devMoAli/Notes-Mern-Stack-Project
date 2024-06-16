// middleware/validationMiddleware.js
const Joi = require("joi");

function validateRegisterUser(obj) {
  const schema = Joi.object({
      username: Joi.string().trim().min(2).max(100).required(),
      email: Joi.string().trim().min(5).max(100).required().email(),
      password: Joi.string().trim().min(5).required(),
  });
  return schema.validate(obj);
}


function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(6).required(),
  });

  return schema.validate(obj);
}
module.exports = { validateRegisterUser, validateLoginUser };
