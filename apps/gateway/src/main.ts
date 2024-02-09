import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { CoursesGateway } from './app/courses.gateway';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import express from 'express';

// const server = express();
async function createServer() {
  const cors = {
    // https://github.com/expressjs/cors#configuration-options
    origin: ['http://localhost:1418', process.env.VITE_SOCKETIO],
    methods: ['GET', 'OPTIONS'],
  };
  const server = express();
  const httpsOptions = {
    key: fs.readFileSync('/var/www/privkey.pem'),
    cert: fs.readFileSync('/var/www/fullchain.pem'),
  };

  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
    CoursesGateway,
    new ExpressAdapter(server),
    { cors },
  );

  await app.init();

  https.createServer(httpsOptions, server)
  await app.listen(35000)
}

createServer()
  .then(() => {
    Logger.log(`🚀 Application is running`);
  })
  .catch(err => Logger.error('Erreur depuis main.ts', err));
