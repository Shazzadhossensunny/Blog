import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
