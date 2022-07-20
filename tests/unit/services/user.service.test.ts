import { User } from '@prisma/client';
import prismaMock from '../../prisma.mock';
import UserService from '../../../src/services/user.service';

describe('The UserService getUser function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(UserService.getUser(1000))
      .rejects.toThrow('Pessoa usuária não encontrada.');
  });

  it('should return the user name', async () => {
    const userMock = {
      firstName: 'Jon',
      lastName: 'Doe',
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);

    const user = await UserService.getUser(1);

    expect(user).toEqual(userMock);
  });
});
