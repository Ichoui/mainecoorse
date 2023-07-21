import { Body, Controller, Delete, Get, Post, Put, Query, UseInterceptors } from '@nestjs/common';

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
  postRecette(@Body() recette: RecettesCreateDto): Promise<ItemBase> {
    return this._recettesService.postRecette(recette);
  }

  @Put()
  putRecette(@Query('id') id: number, @Body() recette: RecettesCreateDto): Promise<ItemBase> {
    return this._recettesService.putRecette(id, recette);
  }

  @Delete()
  removeRecette(@Query('id') id: number): Promise<void> {
    return this._recettesService.removeRecette(id);
  }
}
