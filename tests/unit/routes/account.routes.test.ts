import { AccountRoutes } from '../../../src/routes/account.routes';
import { Router } from 'express';

describe('The AccountRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'get' | 'post'>, []>(() => ({
    get: jest.fn(),
    post: jest.fn(),
  }));

  it('should call the router method "get" with "/account" route', async () => {
    const routerMock = new RouterMock();
    const accountRoutes = new AccountRoutes(routerMock as Router);
    accountRoutes.routes();
    
    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(1);
    expect(routerMock.get).toHaveBeenCalledWith('/account', expect.anything(), expect.anything());
  });

  it('should call the router method "post" with "/account/deposit" route', async () => {
    const routerMock = new RouterMock();
    const accountRoutes = new AccountRoutes(routerMock as Router);
    accountRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(1, 
      '/account/deposit', expect.anything(), expect.anything(), expect.anything());
  });

  it('should call the router method "post" with "/account/withdraw" route', async () => {
    const routerMock = new RouterMock();
    const accountRoutes = new AccountRoutes(routerMock as Router);
    accountRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(2,
      '/account/withdraw', expect.anything(), expect.anything(), expect.anything());
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const accountRoutes = new AccountRoutes(routerMock as Router);
    const routes = accountRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
