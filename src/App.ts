import { createServer, Server } from 'http';
import express from 'express';
import cors from 'cors';
import router from './config/routes';
import globalErrorHandler from './controllers/ErrorController';

interface AppClass {
   server: Server;
}

class App {
   server;
   app;

   constructor() {
      this.app = express();
      this.server = createServer(this.app);
      this.middleware();
      this.setRoutes();
      this.errorHandler();
   }

   setRoutes() {
      this.app.use('/', router);
   }

   middleware() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(cors());
   }

   errorHandler() {
      this.app.use(globalErrorHandler);
   }

   listen() {
      this.server.listen(3000, () => {
         console.log('Server running at port 3000');
      });
   }
}

export default new App();
