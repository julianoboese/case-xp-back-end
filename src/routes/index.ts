import { Router } from 'express';
import accountRoutes from './account.routes';
import assetRoutes from './asset.routes';
import loginRoutes from './login.routes';
import orderRoutes from './order.routes';
import registerRoutes from './register.routes';
import userRoutes from './user.routes';
import operationRoutes from './operation.routes';

const routes: Router[] = [
  loginRoutes.routes(),
  registerRoutes.routes(),
  userRoutes.routes(),
  accountRoutes.routes(),
  assetRoutes.routes(),
  orderRoutes.routes(),
  operationRoutes.routes(),
];

export default routes;
