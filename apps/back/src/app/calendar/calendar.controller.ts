import { Body, Controller, Delete, Get, Put, Query, UseInterceptors } from '@nestjs/common';

import { DiversService } from './divers/divers.service';
import { Days, ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { DaysService } from './days/days.service';
import { DiversDto } from './divers/divers.dto';
import { DaysDto } from './days/days.dto';

@UseInterceptors(ReqInterceptor)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly _diversService: DiversService, private _daysService: DaysService) {}

  // DIVERS CONTROLLER
  @Get('divers')
  getCalendarItems(): Promise<ItemBase[]> {
    return this._diversService.getCalendarDiversItems();
  }

  @Put('divers')
  putCalendarItems(@Body() divers: DiversDto): Promise<ItemBase[]> {
    return this._diversService.putCalendarDiversItem(divers);
  }

  @Delete('divers')
  deleteCalendarItems(@Query('id') id: number): Promise<void> {
    return this._diversService.deleteCalendarDiversItem(id);
  }

  // DAYS CONTROLLER
  @Get('days')
  getCalendarDays(): Promise<Days[]> {
    return this._daysService.getCalendarDays();
  }

  @Put('days')
  putCalendarDays(@Body() days: DaysDto): Promise<Days[]> {
    return this._daysService.putCalendarDay(days);
  }

  @Delete('days')
  deleteCalendarDays(@Query('id') id: number): Promise<void> {
    return this._daysService.deleteCalendarDay(id);
  }
}
