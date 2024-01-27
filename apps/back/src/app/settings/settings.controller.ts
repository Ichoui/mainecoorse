import { Body, Controller, Get, Put, UseInterceptors } from '@nestjs/common';

import { SettingsService } from './settings.service';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { SettingsEntity } from './settings.entity';
import { EFlags } from '@shared-interfaces/flags';
import { SettingsDto } from './settings.dto';

@UseInterceptors(ReqInterceptor)
@Controller('settings')
export class SettingsController {
  constructor(private readonly _settingsService: SettingsService) {}

  @Get()
  generalSettings(): Promise<SettingsEntity> {
    return this._settingsService.generalSettings();
  }

  @Get('/flag')
  getFlag(): Promise<EFlags> {
    return this._settingsService.getFlag();
  }

  @Put('/flag')
  updateFlag(@Body() settings: SettingsDto): Promise<void> {
    return this._settingsService.updateFlag(settings);
  }

  @Put('/strict')
  updateStrict(@Body() settings: SettingsDto): Promise<void> {
    return this._settingsService.updateStrict(settings);
  }
}
