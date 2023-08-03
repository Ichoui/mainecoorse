import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import morgan from 'morgan';
import * as functions from 'firebase-functions';
import { Express } from 'express-serve-static-core';

const defaultWinstonLoggerOptions: winston.LoggerOptions = {
  level: process.env['LOG_LEVEL'],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.splat(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    winston.format.printf((meta: any) => {
      const message = typeof meta.message === 'undefined' ? JSON.stringify(meta) : meta.message;
      const context: string = meta.context || meta.stack?.join?.('|') || 'Undefined';
      return `${meta.timestamp} [${context}] ${meta.level}: ${message.trim()}`;
    }),
  ),
  transports: [new winston.transports.Console({ handleExceptions: true })],
  exitOnError: false,
};
const server = express();

async function createServer(server: Express | NestApplicationOptions) {
  // const app = await NestFactory.create(AppModule);
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    {
      logger: WinstonModule.createLogger(defaultWinstonLoggerOptions),
      cors: {
        // https://github.com/expressjs/cors#configuration-options
        origin: [process.env.DB_HOST, 'http://localhost:1418', process.env.FRONT_URL],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      },
    },
  );
  const logger = new Logger('Main');

  // use winston on myself!
  app.use(
    morgan('dev', {
      stream: {
        write(str: string) {
          logger.debug(str);
        },
      },
    }),
  );

  // app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // res.header('Access-Control-Allow-Origin', ['', '', 'http://localhost:1418']);
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  // next();
  // });

  // app.enableCors({
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
  // origin: ['http://localhost:1418', 'https://mainecoorse.web.app', '5.196.224.11'],
  // preflightContinue: false,
  // });

  app.disable('x-powered-by');
  app.disable('X-Powered-By');
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  if (process.env.MODE === 'DEV') {
    const prefix = 'mc';
    const port = 3945;

    // On prod mode, app don't need to listen at a port, due to firebase cloud functions which already do that
    app.setGlobalPrefix(prefix); // Seulement ici, la const exportée de la Firebase Fonction fait office de préfixe ...
    await app.listen(port);
    Logger.log(`🚀 Application is probably running on: http://localhost:${port}/${prefix}`);
  }
  return app.init();
}

createServer(server)
  .then(() => {
    Logger.log(`🚀 Application is running on: ${process.env.MODE}`);
  })
  .catch(err => console.error('Erreur depuis main.ts', err));

export const mc = functions.https.onRequest(server); // api const is the entry point
