import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { RecettesService } from './recettes.service';
import { ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('recettes')
export class RecettesController {
  constructor(private readonly _recettesService: RecettesService) {}

  @Get()
  getRecettes(): ItemBase[] {
    return this._recettesService.getRecettes();
  }
}
