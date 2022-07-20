import { LoginRoutes } from '../../../src/routes/login.routes';
import { Router } from 'express';
import loginValidator from '../../../src/validators/login.validator';
import LoginController from '../../../src/controllers/login.controller';

describe('The LoginRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'post'>, []>(() => ({
    post: jest.fn(),
  }));

  it('should call the router method "post" with "/login" route', async () => {
    const routerMock = new RouterMock();
    const loginRoutes = new LoginRoutes(loginValidator, routerMock as Router);
    loginRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(1);
    expect(routerMock.post).toHaveBeenCalledWith('/login', loginRoutes.validation.validate, LoginController.login);
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const loginRoutes = new LoginRoutes(loginValidator, routerMock as Router);
    const routes = loginRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
