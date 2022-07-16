import { User } from '@prisma/client';
import prisma from '../prisma';

export default class UserService {
  public static getUser = async (id: number): Promise<Pick<User, 'firstName' | 'lastName'>> => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { firstName: true, lastName: true },
    });

    return user as User;
  };
}
