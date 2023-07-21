import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';

import { RecettesService } from './recettes.service';
import { ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { RecettesCreateDto } from './recettes.dto';

@UseInterceptors(ReqInterceptor)
@Controller('recettes')
export class RecettesController {
  constructor(private readonly _recettesService: RecettesService) {}

  @Get()
  getRecettes(): Promise<ItemBase[]> {
    return this._recettesService.getRecettes();
  }

  @Post()
  postRecette(@Query('id') id: number, @Body() recette: RecettesCreateDto): Promise<ItemBase> {
    return this._recettesService.postRecette(id, recette);
  }
}
