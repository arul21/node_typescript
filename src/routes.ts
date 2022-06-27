import {Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) =>{
    res.send('Hello')
  });

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
}

export default routes;