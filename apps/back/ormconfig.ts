import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from 'process';

export default {
  type: 'postgres',
  host: env.DB_HOST,
  port: +(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_SCHEMA,
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: env.DB_SYNCHRONIZE === 'true',
  ssl: false,
  logging: env.MODE === 'DEV',
  retryAttempts: 1,
  autoLoadEntities: true,
} as TypeOrmModuleOptions;
