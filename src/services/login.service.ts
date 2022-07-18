import bcrypt from 'bcrypt';
import ILogin from '../interfaces/login.interface';
import IToken from '../interfaces/token.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';
import Jwt from '../utils/jwt';

export default class LoginService {
  public static login = async (loginData: ILogin): Promise<IToken> => {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
      select: { id: true, email: true, password: true },
    });

    if (!user) throw new HttpError(400, 'Usuário não encontrado.');

    const match = await bcrypt.compare(loginData.password, user.password);
    if (!match) throw new HttpError(401, 'Senha incorreta.');

    const token = Jwt.generateToken({ id: user.id, email: user.email });

    return { token };
  };
}
