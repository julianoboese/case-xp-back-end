import Joi, { ObjectSchema } from 'joi';

const registerValidator: ObjectSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default registerValidator;
