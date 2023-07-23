import { Body, Controller, Delete, Get, Put, UseInterceptors } from '@nestjs/common';

import { DiversService } from './items/divers.service';
import { Days, ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { DaysService } from './days/days.service';

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
  putCalendarItems(): Promise<ItemBase[]> {
    // BOdy :)
    return this._diversService.putCalendarDiversItem();
  }

  @Delete('divers')
  deleteCalendarItems(): Promise<void> {
    return this._diversService.deleteCalendarDiversItem();
  }

  // DAYS CONTROLLER
  @Get('days')
  getCalendarDays(): Promise<Days[]> {
    return this._daysService.getCalendarDays();
  }

  @Put('days')
  putCalendarDays(): Promise<ItemBase> {
    return this._daysService.putCalendarDay();
  }

  @Delete('days')
  deleteCalendarDays(): Promise<void> {
    return this._daysService.deleteCalendarDay();
  }
}
