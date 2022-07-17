import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../swagger.json';
import ErrorMiddleware from './middlewares/error.middleware';
import routes from './routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.config();
    this.routes();
    this.docs();
    this.handleErrors();
  }

  private config(): void {
    dotenv.config();
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private docs(): void {
    this.server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }

  private handleErrors(): void {
    this.server.use(ErrorMiddleware.handleError);
  }
}

export default new App();
