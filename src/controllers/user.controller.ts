import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public static getUser = async (_req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.getUser(res.locals.user.id);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  };
}
