import { Controller, Get } from '@nestjs/common';

import { CalendarService } from './calendar.service';
import { Days, ItemBase } from '@shared-interfaces/items';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('items')
  getCalendarItems(): ItemBase[] {
    return this.calendarService.getCalendarItems();
  }

  @Get('days')
  getCalendarDays(): Days[] {
    return this.calendarService.getCalendarDays()
  }


}
