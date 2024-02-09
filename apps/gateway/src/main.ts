import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Express } from 'express-serve-static-core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { CoursesGateway } from './app/courses.gateway';
import * as fs from 'fs';

const server = express();
async function createServer(server: Express | NestApplicationOptions) {
  const cors = {
    // https://github.com/expressjs/cors#configuration-options
    origin: ['http://localhost:1418', process.env.VITE_SOCKETIO],
    methods: ['GET', 'OPTIONS'],
  };

  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
    CoursesGateway,
    new ExpressAdapter(server),
    {
      cors,
      httpsOptions: {
        key: fs.readFileSync('./key.pem', 'utf8'),
        cert: fs.readFileSync('./server.crt', 'utf8')
        // key: fs.readFileSync('/etc/letsencrypt/live/vps-07f85069.vps.ovh.net/privkey.pem'),
        // cert: fs.readFileSync('/etc/letsencrypt/live/vps-07f85069.vps.ovh.net/fullchain.pem'),
      },
    },
  );

  app.disable('x-powered-by');
  app.disable('X-Powered-By');
  app.use(cookieParser());
  const prefix = 'gateway';
  app.setGlobalPrefix(prefix);

  return app.init();
}

createServer(server)
  .then(() => {
    Logger.log(`🚀 Application is running`);
  })
  .catch(err => Logger.error('Erreur depuis main.ts', err));
