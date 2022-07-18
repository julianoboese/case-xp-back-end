import { User } from '@prisma/client';
import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import HttpError from './http.error';

export default class Jwt {
  private static TOKEN_SECRET: Secret = process.env.TOKEN_SECRET as Secret;

  private static jwtConfig: SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  public static generateToken = (user: Pick<User, 'id' | 'email'>): string => sign(user, Jwt.TOKEN_SECRET, Jwt.jwtConfig);

  public static authenticateToken = async (auth?: string): Promise<string | JwtPayload> => {
    if (!auth) {
      throw new HttpError(401, 'Acesso não autorizado.');
    }

    try {
      const [, token] = auth.split(' ');
      const validate = verify(token, Jwt.TOKEN_SECRET);
      return validate;
    } catch (_error) {
      throw new HttpError(401, 'Acesso não autorizado.');
    }
  };
}
