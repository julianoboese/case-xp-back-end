import { RegisterRoutes } from '../../../src/routes/register.routes';
import { Router } from 'express';
import registerValidator from '../../../src/validators/register.validator';
import RegisterController from '../../../src/controllers/register.controller';

describe('The RegisterRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'post'>, []>(() => ({
    post: jest.fn(),
  }));

  it('should call the router method "post" with "/register" route', async () => {
    const routerMock = new RouterMock();
    const registerRoutes = new RegisterRoutes(registerValidator, routerMock as Router);
    registerRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(1);
    expect(routerMock.post).toHaveBeenCalledWith('/register', registerRoutes.validation.validate, RegisterController.register);
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const registerRoutes = new RegisterRoutes(registerValidator, routerMock as Router);
    const routes = registerRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
