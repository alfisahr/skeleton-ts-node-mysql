import { createServer, Server } from "http";
import express from "express";
import router from "./config/routes";

interface AppClass {
  server: Server;
}

class App {
  server;
  app;
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.setRoutes();
  }

  setRoutes() {
    this.app.use("/", router);
  }

  listen() {
    this.server.listen(3000, () => {
      console.log("Server running at port 3000");
    });
  }
}

export default new App();
