import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { CalendarService } from './calendar.service';
import { Days, ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly _calendarService: CalendarService) {}

  @Get('items')
  getCalendarItems(): ItemBase[] {
    return this._calendarService.getCalendarItems();
  }

  @Get('days')
  getCalendarDays(): Days[] {
    return this._calendarService.getCalendarDays()
  }


}
