import { Controller, Get, Put, UseInterceptors } from '@nestjs/common';

import { SettingsService } from './settings.service';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { SettingsEntity } from './settings.entity';
import { EFlags } from '@shared-interfaces/flags';

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
  updateFlag(): Promise<void> {
    return this._settingsService.updateFlag();
  }

  @Put('/strict')
  updateStrict(): Promise<void> {
    return this._settingsService.updateStrict();
  }
}
