import Joi, { ObjectSchema } from 'joi';

const accountValidator: ObjectSchema = Joi.object({
  amount: Joi.number().positive().precision(2).required(),
});

export default accountValidator;
