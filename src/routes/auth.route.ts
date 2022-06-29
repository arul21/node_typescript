import express, { Express, Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schema/authSchema';
import validateResource from '../middleware/validateResource';
import { loginHandler, registerHandler } from '../controllers/auth.controller';

const app: Express = express();

app.post('/login', validateResource(loginSchema), loginHandler);
app.post('/register', validateResource(registerSchema), registerHandler);

export default app;
