import { Router } from 'express';
import accountRoutes from './account.routes';

// post /login
// post /register

// get /conta/{userId}
// post /conta/deposito
// post /conta/saque

// get /ativos/{userId}
// get /ativos/{assetId}

// post /investimentos/comprar
// post /investimentos/vender

const routes: Router[] = [accountRoutes.routes()];

export default routes;
