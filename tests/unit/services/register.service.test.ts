import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prismaMock from '../../prisma.mock';
import RegisterService from '../../../src/services/register.service';
import Jwt from '../../../src/utils/jwt';

describe('The RegisterService register function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user is already registered', async () => {
    const userMock = {
      id: 1,
      email: 'fulano.silva@email.com',
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);

    const registerData = {
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'fulano.silva@email.com',
      password: '12345678',
    };

    await expect(RegisterService.register(registerData))
      .rejects.toThrow('Usuário já possui conta.');
  });

  it('should return a token if register data is valid', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('encryptedPassword'));
    jest.spyOn(Jwt, 'generateToken').mockReturnValue('q1w2e3r4t5');

    const registerData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@email.com',
      password: '12345678',
    };
    prismaMock.user.create.mockResolvedValue({ id: 5, email: 'jane.doe@email.com' } as User);

    const token = await RegisterService.register(registerData);

    expect(token).toEqual({ token: 'q1w2e3r4t5' });
  });
});
