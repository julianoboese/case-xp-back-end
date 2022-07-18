import { User } from '@prisma/client';
import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public static getUser = async (_req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const user: Pick<User, 'firstName' | 'lastName'> = await UserService.getUser(id);

    res.status(200).json(user);
  };
}
