import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';
import 'dotenv/config';

export default {
  type: 'postgres',
  host: env.DB_HOST,
  port: +(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD as string,
  database: env.DB_SCHEMA,
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: env.DB_SYNCHRONIZE === 'true',
  ssl: false,
  applicationName: 'ORM x Maple',
  logging: env.MODE === 'DEV' ? true : ['error'],
  retryAttempts: 1,
  autoLoadEntities: true,

} as TypeOrmModuleOptions;
