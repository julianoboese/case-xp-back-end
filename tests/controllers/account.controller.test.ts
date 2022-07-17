import AccountService from '../../src/services/account.service';
import AccountController from '../../src/controllers/account.controller';
import { Request, Response } from 'express';
import { Decimal } from '@prisma/client/runtime';

describe('The AccountController getBalance function', () => {
  
  const requestMock = {};
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const balanceMock = {
    id: 1,
    balance: 1000.00 as unknown as Decimal
  }
  
  beforeEach(() => {
    jest.spyOn(AccountService, 'getBalance').mockResolvedValue(balanceMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AccountController.getBalance(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user balance', async () => {
    await AccountController.getBalance(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(balanceMock));
  });
});

describe('The AccountController deposit function', () => {
  
  const requestMock = { body: { amount: 100 } };
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const newBalanceMock = {
    id: 1,
    balance: 1100.00 as unknown as Decimal
  }
  
  beforeEach(() => {
    jest.spyOn(AccountService, 'deposit').mockResolvedValue(newBalanceMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AccountController.deposit(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user new balance', async () => {
    await AccountController.deposit(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(newBalanceMock));
  });
});

describe('The AccountController withdraw function', () => {
  
  const requestMock = { body: { amount: 100 } };
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const newBalanceMock = {
    id: 1,
    balance: 900.00 as unknown as Decimal
  }
  
  beforeEach(() => {
    jest.spyOn(AccountService, 'withdraw').mockResolvedValue(newBalanceMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AccountController.withdraw(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user new balance', async () => {
    await AccountController.withdraw(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(newBalanceMock));
  });
});
