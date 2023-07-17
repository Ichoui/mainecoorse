import { Controller, Get } from '@nestjs/common';

import { RecettesService } from './recettes.service';
import { ItemBase } from '@shared-interfaces/items';

@Controller('recettes')
export class RecettesController {
  constructor(private readonly articlesService: RecettesService) {}

  @Get()
  getRecettes(): ItemBase[] {
    return this.articlesService.getRecettes();
  }
}
