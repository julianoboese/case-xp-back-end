import { Router } from 'express';
import accountRoutes from './account.routes';
import assetRoutes from './asset.routes';
import loginRoutes from './login.routes';
import orderRoutes from './order.routes';
import registerRoutes from './register.routes';
import userRoutes from './user.routes';

// post /login
// post /register

// get /user

// get /conta/
// post /conta/deposito
// post /conta/saque

// get /ativos/
// get /ativos/{assetId}

// post /investimentos/comprar
// post /investimentos/vender

const routes: Router[] = [
  loginRoutes.routes(),
  registerRoutes.routes(),
  userRoutes.routes(),
  accountRoutes.routes(),
  assetRoutes.routes(),
  orderRoutes.routes(),
];

export default routes;
