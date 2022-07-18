import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/jwt';

export default class AuthMiddleware {
  public static authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const auth = req.headers.authorization;

    const user = await Jwt.authenticateToken(auth);

    res.locals.user = user;

    next();
  };
}
