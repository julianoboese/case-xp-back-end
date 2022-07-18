import { prismaMock } from "../../prisma.mock";
import bcrypt from 'bcrypt';
import LoginService from '../../../src/services/login.service';
import Jwt from "../../../src/utils/jwt";
import { User } from "@prisma/client";

describe('The LoginService login function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user is not found in database', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(LoginService.login({email: 'jane.doe@email.com', password: '12345678'}))
        .rejects.toThrow('Usuário não encontrado.');
  });

  it('should throw an error if password is incorrect', async () => {
    const userMock = {
      id: 1,
      email: 'jon.doe@email.com',
      password: '12345678',
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

    await expect(LoginService.login({email:userMock.email, password: '87654321'}))
        .rejects.toThrow('Senha incorreta.');
  });

  it('should return a token if login data is correct', async () => {
    const userMock = {
      id: 1,
      email: 'jon.doe@email.com',
      password: '12345678',
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(Jwt, 'generateToken').mockReturnValue('q1w2e3r4t5');

    const token = await LoginService.login({email:userMock.email, password: userMock.password});

    expect(token).toEqual({ token: 'q1w2e3r4t5' });
  });
});

