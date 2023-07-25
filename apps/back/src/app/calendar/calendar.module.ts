import { Module } from '@nestjs/common';
import { DiversService } from './divers/divers.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiversEntity } from './divers/divers.entity';
import { DaysService } from './days/days.service';
import { DaysEntity } from './days/days.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiversEntity]), TypeOrmModule.forFeature([DaysEntity])],
  controllers: [CalendarController],
  providers: [DiversService, DaysService],
  exports: [DiversService, DaysService],
})
export class CalendarModule {}
