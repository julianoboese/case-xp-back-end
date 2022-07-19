import Joi, { ObjectSchema } from 'joi';

const orderValidator: ObjectSchema = Joi.object({
  assetId: Joi.number().integer().positive().required(),
  amount: Joi.number().integer().positive().required(),
  price: Joi.number().required(),
});

export default orderValidator;
