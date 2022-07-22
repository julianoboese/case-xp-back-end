import { Router } from 'express';
import { OperationRoutes } from '../../../src/routes/operation.routes';
import AuthMiddleware from '../../../src/middlewares/auth.middleware';
import OperationController from '../../../src/controllers/operation.controller';

describe('The OperationRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'get'>, []>(() => ({
    get: jest.fn(),
  }));

  it('should call the router method "get" with "/operations" route', async () => {
    const routerMock = new RouterMock();
    const operationRoutes = new OperationRoutes(routerMock as Router);
    operationRoutes.routes();

    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(1);
    expect(routerMock.get).toHaveBeenCalledWith(
      '/operations',
      AuthMiddleware.authenticate,
      OperationController.getOperations,
    );
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const operationRoutes = new OperationRoutes(routerMock as Router);
    const routes = operationRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
