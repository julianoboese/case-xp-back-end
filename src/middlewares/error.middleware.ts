import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/http.error';

export default class ErrorMiddleware {
  public static handleError = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void => {
    const { status, message } = error as HttpError;

    res.status(status || 500).json({ message });
  };
}
