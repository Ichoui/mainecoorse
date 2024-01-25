import { Controller, Get, Put, UseInterceptors } from '@nestjs/common';

import { SettingsService } from './settings.service';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('settings')
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  generalSettings(): Promise<boolean> {
    return this._settingsService.generalSettings();
  }

  @Get('/flag')
  getFlag(): Promise<void> {
    return this._settingsService.getFlag();
  }

  @Put('/flag')
  updateFlag(): Promise<void> {
    return this._settingsService.updateFlag();
  }

  @Put('/strict')
  updateStrict(): Promise<void> {
    return this._settingsService.updateStrict();
  }
}
