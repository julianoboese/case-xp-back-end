import { Decimal } from '@prisma/client/runtime';
import { User } from '@prisma/client';
import { prismaMock } from '../../prisma.mock';
import AccountService from '../../../src/services/account.service';

describe('The AccountService getBalance function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(AccountService.getBalance(1000)).rejects.toThrow(
      'Pessoa usuária não encontrada.',
    );
  });

  it('should return the user account current balance', async () => {
    const userMock = {
      id: 1,
      balance: 1000.0 as unknown as Decimal,
    };

    prismaMock.user.findUnique.mockResolvedValue(userMock as User);

    const balance = await AccountService.getBalance(1);

    expect(balance).toEqual({ id: 1, balance: 1000.0 });
  });
});

describe('The AccountService deposit function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return the updated account balance', async () => {
    const userMock = {
      id: 1,
      balance: 1100.0 as unknown as Decimal,
    };

    prismaMock.user.update.mockResolvedValue(userMock as User);

    const balance = await AccountService.deposit(1, 100);

    expect(balance).toEqual({ id: 1, balance: 1100.0 });
  });
});

describe('The AccountService withdraw function', () => {
  afterEach(() => jest.clearAllMocks());

  it("should throw an error if user doesn't have enough funds", async () => {
    const userMock = {
      id: 1,
      balance: 1000.0,
    };

    jest.spyOn(AccountService, 'getBalance').mockResolvedValue(userMock);

    await expect(AccountService.withdraw(1, 1100.0)).rejects.toThrow(
      'Saldo insuficiente.',
    );
  });

  it('should return the updated account balance if user has enough funds', async () => {
    const userMock = {
      id: 1,
      balance: 900.0 as unknown as Decimal,
    };

    prismaMock.user.update.mockResolvedValue(userMock as User);

    const balance = await AccountService.withdraw(1, 100);

    expect(balance).toEqual({ id: 1, balance: 900.0 });
  });
});
