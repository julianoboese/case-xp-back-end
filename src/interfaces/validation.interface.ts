import { NextFunction, Request, Response } from 'express';

export default interface IValidation {
  validate (req: Request, _res: Response, next: NextFunction): void
}
