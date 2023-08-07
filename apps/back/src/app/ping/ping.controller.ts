import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { PingService } from './ping.service';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('ping')
export class PingController {
  constructor(private readonly _notesService: PingService) {}

  @Get()
  ping(): Promise<boolean> {
    return this._notesService.ping();
  }
}
