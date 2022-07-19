import { OrderRoutes } from '../../../src/routes/order.routes';
import { Router } from 'express';

describe('The OrderRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'post'>, []>(() => ({
    post: jest.fn(),
  }));

  it('should call the router method "post" with "/order/buy" route', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(routerMock as Router);
    orderRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(1, 
      '/order/buy', expect.anything(), expect.anything(), expect.anything());
  });

  it('should call the router method "post" with "/order/sell" route', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(routerMock as Router);
    orderRoutes.routes();
    
    expect(routerMock.post).toHaveBeenCalled();
    expect(routerMock.post).toHaveBeenCalledTimes(2);
    expect(routerMock.post).toHaveBeenNthCalledWith(2,
      '/order/sell', expect.anything(), expect.anything(), expect.anything());
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const orderRoutes = new OrderRoutes(routerMock as Router);
    const routes = orderRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
