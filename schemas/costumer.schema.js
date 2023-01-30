const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastName = Joi.string().min(2);
const phone = Joi.number().min(9);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createCostumerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCostumerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

const getCostumerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCostumerSchema,
  updateCostumerSchema,
  getCostumerSchema,
};
