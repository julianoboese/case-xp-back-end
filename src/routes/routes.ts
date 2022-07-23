import { Router } from 'express';

export default abstract class Routes {
  constructor(protected router: Router = Router()) {}

  public abstract routes(): Router;
}
