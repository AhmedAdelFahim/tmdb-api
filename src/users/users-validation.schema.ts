import Joi from 'joi';

const schema = {
  signup: Joi.object({
    email: Joi.string().trim().required().email(),
    name: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
  login: Joi.object({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required(),
  }),
};

export default schema;
