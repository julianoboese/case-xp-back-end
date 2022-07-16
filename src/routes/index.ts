import { Router } from 'express';
import accountRoutes from './account.routes';
import assetsRoutes from './assets.routes';
import loginRoutes from './login.routes';
import orderRoutes from './order.routes';

// post /login
// post /register

// get /conta/{userId}
// post /conta/deposito
// post /conta/saque

// get /ativos/{userId}
// get /ativos/{assetId}

// post /investimentos/comprar
// post /investimentos/vender

const routes: Router[] = [
  loginRoutes.routes(),
  accountRoutes.routes(),
  assetsRoutes.routes(),
  orderRoutes.routes(),
];

export default routes;
