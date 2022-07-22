import { Type } from '@prisma/client';
import IBalance from '../interfaces/balance.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';

export default class AccountService {
  public static getBalance = async (id: number): Promise<IBalance> => {
    const balance = await prisma.user.findUnique({
      where: { id },
      select: { id: true, balance: true },
    });

    if (!balance) throw new HttpError(404, 'Pessoa usuária não encontrada.');

    return { id, balance: Number(balance.balance) };
  };

  public static deposit = async (id: number, amount: number): Promise<IBalance> => {
    const newBalance = await prisma.user.update({
      where: { id },
      select: { id: true, balance: true },
      data: {
        balance: {
          increment: amount,
        },
        operations: {
          create: {
            type: Type.DEPOSIT,
            amount,
          },
        },
      },
    });

    return { id, balance: Number(newBalance.balance) };
  };

  public static withdraw = async (id: number, amount: number): Promise<IBalance> => {
    const currentBalance = await AccountService.getBalance(id);

    if (Number(currentBalance.balance) < amount) {
      throw new HttpError(422, 'Saldo insuficiente.');
    }

    const newBalance = await prisma.user.update({
      where: { id },
      select: { id: true, balance: true },
      data: {
        balance: {
          decrement: amount,
        },
        operations: {
          create: {
            type: Type.WITHDRAW,
            amount: -amount,
          },
        },
      },
    });

    return { id, balance: Number(newBalance.balance) };
  };
}
