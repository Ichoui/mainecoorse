import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

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
  applicationName: 'ORM : Maple le Coon',
  logNotifications: true, // ?? A tester
  logging: env.MODE === 'DEV' ? true : ['query', 'error'],
  retryAttempts: 1,
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
