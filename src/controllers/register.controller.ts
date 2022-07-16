import { Request, Response } from 'express';
import RegisterService from '../services/register.service';

export default class RegisterController {
  public static register = async (req: Request, res: Response): Promise<void> => {
    const token = await RegisterService.register(req.body);

    res.status(201).json({ token });
  };
}
