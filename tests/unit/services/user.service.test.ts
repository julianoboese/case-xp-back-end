import { prismaMock } from "../.././prisma.mock";
import UserService from '../../../src/services/user.service';
import { User } from "@prisma/client";

describe('The UserService getUser function', () => {

  afterEach(() => jest.clearAllMocks());

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