import Joi, { ObjectSchema } from 'joi';

const loginValidator: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default loginValidator;
