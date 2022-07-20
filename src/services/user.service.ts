import { User } from '@prisma/client';
import prisma from '../prisma';
import HttpError from '../utils/http.error';

export default class UserService {
  public static getUser = async (id: number): Promise<Pick<User, 'firstName' | 'lastName'>> => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { firstName: true, lastName: true },
    });

    if (!user) throw new HttpError(404, 'Pessoa usuária não encontrada.');

    return user;
  };
}
