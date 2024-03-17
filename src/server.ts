// server.ts
import express, { Express } from 'express';
import routes from './routes/index.js';
import { corsMiddleware } from './middlewares/cors.js';
import { asyncHandler, errorHandler } from './middlewares/error';

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandling(); // Asegúrate de llamar a este método al final del constructor
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(corsMiddleware());
  }

  private routes(): void {
    this.app.use('/api/v1', routes);
    this.app.get('/', (req, res) => {
      res.send('API de GangaExpress');
    });
  }

  private errorHandling(): void {
    // Aquí usamos el middleware errorHandler
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  }
}

export default Server;
