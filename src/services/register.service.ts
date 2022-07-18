import bcrypt from 'bcrypt';
import IRegister from '../interfaces/register.interface';
import IToken from '../interfaces/token.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';
import Jwt from '../utils/jwt';

export default class RegisterService {
  public static register = async (registerData: IRegister): Promise<IToken> => {
    const { firstName, lastName, email, password } = registerData;
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    if (user) throw new HttpError(409, 'Usuário já possui conta.');

    const hashPassword = await bcrypt.hash(password, 5);
    const createdUser = await prisma.user.create({
      data: { firstName, lastName, email, password: hashPassword },
      select: { id: true, email: true },
    });

    const token = Jwt.generateToken(createdUser);

    return { token };
  };
}
