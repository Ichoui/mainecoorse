import { Controller, Get, Put, UseInterceptors } from '@nestjs/common';

import { DiversService } from './items/divers.service';
import { Days, ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { DaysService } from './days/days.service';

@UseInterceptors(ReqInterceptor)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly _diversService: DiversService, private _daysService: DaysService) {}

  @Get('divers')
  getCalendarItems(): Promise<ItemBase[]> {
    return this._diversService.getCalendarDiversItems();
  }

  @Put('divers')
  putCalendarItems(): ItemBase[] {
    return this._diversService.putCalendarDiversItems();
  }

  @Get('days')
  getCalendarDays(): Days[] {
    return this._daysService.getCalendarDays();
  }

  @Put('days')
  putCalendarDays(): Days[] {
    return this._daysService.putCalendarDays();
  }
}
