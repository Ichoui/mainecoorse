import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { ArticleList, ItemBase } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { CoursesDto, CoursesPurchasedDto, CoursesQuantityDto } from './courses.dto';

@UseInterceptors(ReqInterceptor)
@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Get()
  getCourses(): Promise<ArticleList[]> {
    return this._coursesService.getCourses();
  }

  @Post()
  addArticle(@Body() article: CoursesDto[]): Promise<ItemBase> {
    return this._coursesService.postArticle(article);
  }

  @Put('quantity')
  updateQuantity(@Body() quantity: CoursesQuantityDto): Promise<void> {
    return this._coursesService.updateQuantity(quantity);
  }

  @Put('purchased')
  updatePurchasedStatus(@Body() purchased: CoursesPurchasedDto): Promise<void> {
    return this._coursesService.updatePurchasedStatus(purchased);
  }

  @Delete()
  removeArticles(): Promise<void> {
    return this._coursesService.removeArticles();
  }
}
