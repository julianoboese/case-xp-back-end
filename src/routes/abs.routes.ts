import { Router } from 'express';

export default abstract class ARoutes {
  constructor(protected router: Router = Router()) {}

  public abstract routes(): Router;
}
