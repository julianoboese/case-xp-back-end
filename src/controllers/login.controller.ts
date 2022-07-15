import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public static login = async (req: Request, res: Response): Promise<void> => {
    const token = await LoginService.login(req.body);

    res.status(200).json({ token });
  };
}
