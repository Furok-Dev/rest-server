const joi = require('joi');

const userIdSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createUserSchema = {
  nombre: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  img: joi.string(),
  role: joi.string().default('USER_ROLE'),
  estado: joi.boolean().default(true),
  google: joi.boolean().default(false),
};

module.exports = { userIdSchema, createUserSchema };
