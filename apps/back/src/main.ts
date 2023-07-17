/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import morgan from 'morgan';

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

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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

  const globalPrefix = 'api/mc';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors();
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const port = process.env.PORT || 3945;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
