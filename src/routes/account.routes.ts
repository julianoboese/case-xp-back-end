import { Router } from 'express';
import AccountController from '../controllers/account.controller';

class AccountRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.get('/conta/:id', AccountController.getBalance);
    this._router.post('/conta/deposito', AccountController.deposit);
    this._router.post('/conta/saque', AccountController.withdraw);

    return this._router;
  }
}

export default new AccountRoutes();
