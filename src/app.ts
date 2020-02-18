import Server from "express";

import bodyParser from "body-parser";
import cors from "cors";

import errors from "./middlewares/error";

import exampleRoutes from "./routes/example";
import partnersRoutes from "./routes/partners";

import "./config/env";

interface AppInterface {
  server: Server.Express;
}

class App implements AppInterface {
  public server: Server.Express;

  constructor() {
    this.server = Server();

    this.middlewares();
    this.routes();
    this.listeners();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }

  private routes(): void {
    this.server.use(exampleRoutes);
    this.server.use(partnersRoutes);
  }

  private listeners(): void {
    this.server.use(errors.notFound);
    this.server.use(errors.exception);
  }
}

export default new App().server;
