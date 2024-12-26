import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import { globalErrorRequestHandler } from './app/middlewares/globalErrorRequestHandler';
import { notFound } from './app/middlewares/notFound';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api', router);

app.use(globalErrorRequestHandler);
app.use(notFound);

export default app;
