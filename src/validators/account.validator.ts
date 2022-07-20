import Joi, { ObjectSchema } from 'joi';

const accountValidator: ObjectSchema = Joi.object({
  amount: Joi.number().positive().required(),
});

export default accountValidator;
