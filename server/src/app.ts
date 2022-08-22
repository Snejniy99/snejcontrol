import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { createServer, Server } from 'http';
import { Server as IoServer, Socket } from 'socket.io';
import ConnectionService from './sockets/services/connection.service';
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public http: Server;
  public io: IoServer;
  public connectionService: ConnectionService = new ConnectionService();

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.http = createServer(this.app);
    this.io = new IoServer(this.http, {
      cors: {
        origin: ORIGIN,
      },
    });

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initializeSocket();
  }

  public listen() {
    this.http.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeSocket() {
    this.io.on('connection', async (socket: Socket) => {
      await this.connectionService.setOnlineStatus(socket.handshake.auth.id, true);
      console.log('Connected: User -', socket.handshake.auth.username, ', Id -', socket.handshake.auth.userUuid);
      socket.on('disconnect', async (reason: string) => {
        await this.connectionService.setOnlineStatus(socket.handshake.auth.id, false);
        console.log('Disconnected: User -', socket.handshake.auth.username, ', Id -', socket.handshake.auth.userUuid, '. Reason: ' + reason);
      });
      socket.on('enter', userData => {
        socket.broadcast.emit('test', userData);
      });
    });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    console.log(ORIGIN);
    this.app.use(
      cors({
        origin: ORIGIN,
        credentials: CREDENTIALS,
        optionsSuccessStatus: 200,
      }),
    );
    // this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'SnejControl API Docs',
          version: '1.0.0',
          description: 'Documentation of SnejControl service',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
