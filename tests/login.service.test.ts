import { prismaMock } from "./prisma.mock";
import bcrypt from 'bcrypt';
import LoginService from '../src/services/login.service';
import Jwt from "../src/utils/jwt";
import { Decimal } from '@prisma/client/runtime';

describe('The POST /login route', () => {

  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user is not found in database', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(LoginService.login({email: 'jane.doe@email.com', password: '12345678'}))
        .rejects.toThrow('Usuário não encontrado.');
  });

  it('should throw an error if password is incorrect', async () => {
    const userMock = {
      id: 1,
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'jon.doe@email.com',
      password: '12345678',
      balance: 1000.00 as unknown as Decimal,
      createdAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

    await expect(LoginService.login({email:userMock.email, password: '87654321'}))
        .rejects.toThrow('Senha incorreta.');
  });

  it('should return a token if login data is correct', async () => {
    const userMock = {
      id: 1,
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'jon.doe@email.com',
      password: '12345678',
      balance: 1000.00 as unknown as Decimal,
      createdAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock);
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(Jwt, 'generateToken').mockReturnValue('q1w2e3r4t5');

    const token = await LoginService.login({email:userMock.email, password: userMock.password});

    expect(token).toEqual('q1w2e3r4t5');
  });
});

