import bcrypt from 'bcrypt';
import IRegister from '../interfaces/register.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';
import Jwt from '../utils/jwt';

export default class RegisterService {
  public static register = async (newUser: IRegister): Promise<string> => {
    const { firstName, lastName, email, password } = newUser;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) throw new HttpError(409, 'Usuário já possui conta.');

    const hashPassword = await bcrypt.hash(password, 5);
    const createdUser = await prisma.user.create({
      data: { firstName, lastName, email, password: hashPassword },
      select: { id: true, email: true },
    });

    const token = Jwt.generateToken(createdUser);

    return token;
  };
}
