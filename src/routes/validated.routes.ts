import { Router } from 'express';
import { ObjectSchema } from 'joi';
import IValidation from '../interfaces/validation.interface';
import ValidationMiddleware from '../middlewares/validation.middleware';
import Routes from './routes';

export default abstract class ValidatedRoutes extends Routes {
  public readonly validation: IValidation;

  constructor(validator: ObjectSchema, router?: Router) {
    super(router);
    this.validation = new ValidationMiddleware(validator);
  }
}
