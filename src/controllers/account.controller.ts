import { Request, Response } from 'express';
import AccountService from '../services/account.service';

export default class AccountController {
  public static getBalance = async (req: Request, res: Response): Promise<void> => {
    const balance = await AccountService.getBalance(Number(req.params.id));

    res.status(200).json(balance);
  };

  public static deposit = async (req: Request, res: Response): Promise<void> => {
    const newBalance = await AccountService.deposit(1, req.body.amount);

    res.status(200).json(newBalance);
  };

  public static withdraw = async (req: Request, res: Response): Promise<void> => {
    const newBalance = await AccountService.withdraw(1, req.body.amount);

    res.status(200).json(newBalance);
  };
}
