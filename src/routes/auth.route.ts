import express, { Express, Request, Response } from 'express';
import { loginSchema } from '../schema/authSchema';
import validateResource from '../middleware/validateResource';
import { loginHandler } from '../controllers/auth.controller';

const app: Express = express();

// app.post('/login', (req: Request, res: Response) => {
//   res.send('Hello Auth');
// });

app.post('/login', validateResource(loginSchema), loginHandler);

export default app;
