import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import HttpError from '../utils/http.error';

export default class ValidationMiddleware {
  private _schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this._schema = schema;
  }

  public validate = (req: Request, _res: Response, next: NextFunction): void => {
    const { error } = this._schema.validate(req.body);

    if (error) throw new HttpError(400, error.details[0].message);

    next();
  };
}
