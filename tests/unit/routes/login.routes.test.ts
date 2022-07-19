import { LoginRoutes } from '../../../src/routes/login.routes';
import { Router } from 'express';

describe('The LoginRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'post'>, []>(() => ({
    post: jest.fn(),
  }));

  it('should call the router method "post" with "/login" route', async () => {
    const routerMock = new RouterMock();
    const loginRoutes = new LoginRoutes(routerMock as Router);
    loginRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(1);
    expect(routerMock.post).toHaveBeenCalledWith('/login', expect.anything(), expect.anything());
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const loginRoutes = new LoginRoutes(routerMock as Router);
    const routes = loginRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
