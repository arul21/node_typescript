import { Express, Request, Response } from 'express';
import AuthRoute from './auth.route';

function routes(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
  });
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.use('/api/v1/auth', AuthRoute);
  app.get('*', (req: Request, res: Response) => res.status(404).send('what???'));
}

export default routes;
