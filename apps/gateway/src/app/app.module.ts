import { Module } from '@nestjs/common';
import { CoursesGateway } from './courses.gateway';

@Module({
  providers: [CoursesGateway],
})
export class AppModule {}
