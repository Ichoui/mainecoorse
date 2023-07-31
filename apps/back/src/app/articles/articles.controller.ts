import { Body, Controller, Delete, Get, Post, Put, Query, UseInterceptors } from '@nestjs/common';

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
  postArticle(@Body() articles: ArticlesCreateDto): Promise<void> {
    return this._articlesService.postArticle(articles);
  }

  @Put()
  putArticle(@Query('id') id: number, @Body() article: ArticlesUpdateDto): Promise<void> {
    return this._articlesService.putArticle(id, article);
  }

  @Delete()
  removeArticle(@Query('id') id: number): Promise<void> {
    return this._articlesService.removeArticle(id);
  }
}
