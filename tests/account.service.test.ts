import { prismaMock } from "./prisma.mock";
import AccountService from '../src/services/account.service';
import { Decimal } from '@prisma/client/runtime';
import { User } from "@prisma/client";

describe('The AccountService getBalance function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should return the user account current balance', async () => {
    const userMock = {
      id: 1,
      balance: 1000.00 as unknown as Decimal,
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);

    const balance = await AccountService.getBalance(1);

    expect(balance).toEqual({id: 1, balance: 1000.00});
  });
});

describe('The AccountService deposit function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should return the updated account balance', async () => {
    const userMock = {
      id: 1,
      balance: 1100.00 as unknown as Decimal,
    };

    prismaMock.user.update.mockResolvedValue(userMock as User);

    const balance = await AccountService.deposit(1, 100);

    expect(balance).toEqual({id: 1, balance: 1100.00});
  });
})

describe('The AccountService withdraw function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user doesn\'t have enough funds', async () => {
    const userMock = {
      id: 1,
      balance: 1000.00 as unknown as Decimal,
    };

    jest.spyOn(AccountService, 'getBalance').mockResolvedValue(userMock)

    await expect(AccountService.withdraw(1, 1100.00))
        .rejects.toThrow('Saldo insuficiente.');
  });

  it('should return the updated account balance if user has enough funds', async () => {
    const userMock = {
      id: 1,
      balance: 900.00 as unknown as Decimal,
    };

    prismaMock.user.update.mockResolvedValue(userMock as User);

    const balance = await AccountService.withdraw(1, 100);

    expect(balance).toEqual({id: 1, balance: 900.00});
  });
})
