import { AssetRoutes } from '../../../src/routes/asset.routes';
import { Router } from 'express';
import AuthMiddleware from '../../../src/middlewares/auth.middleware';
import AssetController from '../../../src/controllers/asset.controller';

describe('The AssetRoutes "routes" function', () => {
  const RouterMock = jest.fn<Pick<Router, 'get'>, []>(() => ({
    get: jest.fn(),
  }));

  it('should call the router method "get" with "/assets/all" route', async () => {
    const routerMock = new RouterMock();
    const assetRoutes = new AssetRoutes(routerMock as Router);
    assetRoutes.routes();
    
    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(3);
    expect(routerMock.get).toHaveBeenNthCalledWith(1,
      '/assets/all', AuthMiddleware.authenticate, AssetController.getAllAssets);
  });

  it('should call the router method "get" with "/assets" route', async () => {
    const routerMock = new RouterMock();
    const assetRoutes = new AssetRoutes(routerMock as Router);
    assetRoutes.routes();
    
    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(3);
    expect(routerMock.get).toHaveBeenNthCalledWith(2, 
      '/assets', AuthMiddleware.authenticate, AssetController.getAssets);
  });

  it('should call the router method "get" with "/assets/{assetId}" route', async () => {
    const routerMock = new RouterMock();
    const assetRoutes = new AssetRoutes(routerMock as Router);
    assetRoutes.routes();
    
    expect(routerMock.get).toHaveBeenCalled();
    expect(routerMock.get).toHaveBeenCalledTimes(3);
    expect(routerMock.get).toHaveBeenNthCalledWith(3,
      '/assets/:id', AuthMiddleware.authenticate, AssetController.getAsset);
  });

  it('should return the router', async () => {
    const routerMock = new RouterMock();
    const assetRoutes = new AssetRoutes(routerMock as Router);
    const routes = assetRoutes.routes();

    expect(routes).toEqual(routerMock);
  });
});
