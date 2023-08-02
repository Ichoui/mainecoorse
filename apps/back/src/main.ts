import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import morgan from 'morgan';
import * as functions from 'firebase-functions';
import express from 'express';
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

async function bootstrap(server: Express | NestApplicationOptions) {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
    logger: WinstonModule.createLogger(defaultWinstonLoggerOptions),
  });
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

  const secondSegmentPrefix = 'mc';
  // app.setGlobalPrefix(secondSegmentPrefix);

  app.disable('x-powered-by');
  app.disable('X-Powered-By');
  app.enableCors();
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  if (process.env.MODE === 'DEV') {
    // On prod mode, app don't need to listen at a port, due to firebase cloud functions which already do that
    const port = process.env.PORT || 3945;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${secondSegmentPrefix}`);
  }
  return app.init();
}

bootstrap(server)
  .then(() => console.warn(`🚀 Application is running on: http://ALLEZ LE FOOT`))
  .catch(err => console.error('Erreur depuis main.ts', err));

export const mc = functions.https.onRequest(server); // api const is the entry point
