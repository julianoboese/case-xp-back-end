import { Router } from 'express';
import { OrderRoutes } from '../../../src/routes/order.routes';
import orderValidator from '../../../src/validators/order.validator';
import AuthMiddleware from '../../../src/middlewares/auth.middleware';
import OrderController from '../../../src/controllers/order.controller';

describe('The OrderRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'post'>, []>(() => ({
    post: jest.fn(),
  }));

  it('should call the router method "post" with "/order/buy" route', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(orderValidator, routerMock as Router);
    orderRoutes.routes();

    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(
      1,
      '/order/buy',
      AuthMiddleware.authenticate,
      orderRoutes.validation.validate,
      OrderController.buyAsset,
    );
  });

  it('should call the router method "post" with "/order/sell" route', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(orderValidator, routerMock as Router);
    orderRoutes.routes();

    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(
      2,
      '/order/sell',
      AuthMiddleware.authenticate,
      orderRoutes.validation.validate,
      OrderController.sellAsset,
    );
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(orderValidator, routerMock as Router);
    const routes = orderRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
