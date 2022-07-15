import { User } from '@prisma/client';
import prisma from '../prisma';
import HttpError from '../utils/http.error';

export default class AccountService {
  public static getBalance = async (id: number): Promise<Pick<User, 'id' | 'balance'>> => {
    const balance = await prisma.user.findUnique({
      where: { id },
      select: { id: true, balance: true },
    });

    return balance as User;
  };

  public static deposit = async (id: number, amount: number): Promise<Pick<User, 'id' | 'balance'>> => {
    const newBalance = await prisma.user.update({
      where: { id },
      select: { id: true, balance: true },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return newBalance;
  };

  public static withdraw = async (id: number, amount: number): Promise<Pick<User, 'id' | 'balance'>> => {
    const currentBalance = await AccountService.getBalance(id);
    if (Number(currentBalance.balance) < amount) {
      throw new HttpError(400, 'Saldo insuficiente.');
    }

    const newBalance = await prisma.user.update({
      where: { id },
      select: { id: true, balance: true },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    return newBalance;
  };
}
