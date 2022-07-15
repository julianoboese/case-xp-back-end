import express from 'express';
import 'express-async-errors';
import ErrorsMiddleware from './middlewares/error.middleware';

const app = express();

app.use(ErrorsMiddleware.handleError);

export default app;
