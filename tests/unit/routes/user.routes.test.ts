import { Router } from 'express';
import { UserRoutes } from '../../../src/routes/user.routes';
import AuthMiddleware from '../../../src/middlewares/auth.middleware';
import UserController from '../../../src/controllers/user.controller';

describe('The UserRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'get'>, []>(() => ({
    get: jest.fn(),
  }));

  it('should call the router method "get" with "/user" route', async () => {
    const routerMock = new RouterMock();
    const userRoutes = new UserRoutes(routerMock as Router);
    userRoutes.routes();

    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(1);
    expect(routerMock.get).toHaveBeenCalledWith(
      '/user',
      AuthMiddleware.authenticate,
      UserController.getUser,
    );
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const userRoutes = new UserRoutes(routerMock as Router);
    const routes = userRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
