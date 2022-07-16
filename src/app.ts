import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import ErrorMiddleware from './middlewares/error.middleware';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(ErrorMiddleware.handleError);

export default app;
