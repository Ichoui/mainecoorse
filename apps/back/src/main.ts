import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Express } from 'express-serve-static-core';
import morgan from 'morgan';
import { onRequest } from 'firebase-functions/v2/https';

const server = express();
async function createServer(server: Express | NestApplicationOptions) {
  const cors = {
    // https://github.com/expressjs/cors#configuration-options
    origin: [process.env.DB_HOST, 'http://localhost:1418', process.env.FRONT_URL, 'http://localhost:5000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  };
  let options: NestApplicationOptions;

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
        return `${process.env.mode === 'DEV' ? meta.timestamp + ' ' : ''}[${context}] ${meta.level}> ${message.trim()}`;
      }),
    ),
    transports: [new winston.transports.Console({ handleExceptions: true })],
    exitOnError: false,
  };
  // eslint-disable-next-line prefer-const
  options = { logger: WinstonModule.createLogger(defaultWinstonLoggerOptions), cors };

  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    options,
  );

  app.disable('x-powered-by');
  app.disable('X-Powered-By');
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const prefix = 'mc';
  app.setGlobalPrefix(prefix);

  if (process.env.MODE === 'DEV') {
    const port = 3945;
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

    // En mode production, l'application n'a pas besoin d'écouter sur un port, car les fonctions cloud de Firebase le font déjà.
    await app.listen(port);
    Logger.log(`🚀 Application is probably running on: http://localhost:${port}`);
  }
  return app.init();
}

createServer(server)
  .then(() => {
    Logger.log(`🚀 Application is running on: ${process.env.MODE}`);
  })
  .catch(err => Logger.error('Erreur depuis main.ts', err));

export const mc = onRequest({ maxInstances: 50 }, server);
