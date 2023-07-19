import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly _articlesService: ArticlesService) {}

  @Get()
  getArticles(): ItemBase[] {
    return this._articlesService.getArticles();
  }
}
