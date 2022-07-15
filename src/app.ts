import express from 'express';
import 'express-async-errors';
import ErrorsMiddleware from './middlewares/error.middleware';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(ErrorsMiddleware.handleError);

export default app;
