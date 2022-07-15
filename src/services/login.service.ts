import ILogin from '../interfaces/login.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';
import Jwt from '../utils/jwt';

export default class LoginService {
  public static login = async (loginData: ILogin): Promise<string> => {
    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    if (!user) throw new HttpError(400, 'Usuário não encontrado.');

    if (loginData.password !== user.password) throw new HttpError(401, 'Senha incorreta.');

    const token = Jwt.generateToken(user);

    return token;
  };
}
