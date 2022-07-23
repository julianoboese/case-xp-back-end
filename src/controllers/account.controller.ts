import { Request, Response } from 'express';
import IBalance from '../interfaces/balance.interface';
import AccountService from '../services/account.service';

export default class AccountController {
  public static getBalance = async (_req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const balance: IBalance = await AccountService.getBalance(id);

    res.status(200).json(balance);
  };

  public static deposit = async (req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const newBalance: IBalance = await AccountService.deposit(id, req.body.amount);

    res.status(201).json(newBalance);
  };

  public static withdraw = async (req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const newBalance: IBalance = await AccountService.withdraw(id, req.body.amount);

    res.status(201).json(newBalance);
  };
}
