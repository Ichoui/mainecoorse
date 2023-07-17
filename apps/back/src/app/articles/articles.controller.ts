import { Controller, Get } from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { ItemBase } from '../../../../../libs/shared-interfaces/src';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(): ItemBase[] {
    return this.articlesService.getArticles();
  }
}
