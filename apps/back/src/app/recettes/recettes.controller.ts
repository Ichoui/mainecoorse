import { Controller, Get } from '@nestjs/common';

import { RecettesService } from './recettes.service';
import { ItemBase } from '@shared-interfaces/items';

@Controller('recettes')
export class RecettesController {
  constructor(private readonly recettesService: RecettesService) {}

  @Get()
  getRecettes(): ItemBase[] {
    return this.recettesService.getRecettes();
  }
}
