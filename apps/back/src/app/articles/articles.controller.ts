import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { ArticlesCreateDto, ArticlesUpdateDto } from './articles.dto';

@UseInterceptors(ReqInterceptor)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly _articlesService: ArticlesService) {}

  @Get()
  getArticles(): Promise<ItemBase[]> {
    return this._articlesService.getArticles();
  }

  @Post()
  postArticles(@Body() articles: ArticlesCreateDto): Promise<ItemBase> {
    return this._articlesService.postArticles(articles);
  }

  @Put()
  putArticles(@Query('id') id: number, @Body() articles: ArticlesUpdateDto): Promise<ItemBase> {
    return this._articlesService.putArticles(id, articles);
  }

  @Delete()
  deleteArticle(@Query('id') id: number): Promise<void> {
    return this._articlesService.removeArticle(id);
  }
}
