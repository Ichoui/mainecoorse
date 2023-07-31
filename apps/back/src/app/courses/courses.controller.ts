import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { CoursesArticleList } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';
import { CoursesPostDto, CoursesPurchasedDto, CoursesQuantityDto } from './courses.dto';

@UseInterceptors(ReqInterceptor)
@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Get()
  getCourses(): Promise<CoursesArticleList[]> {
    return this._coursesService.getCourses();
  }

  @Post()
  upsertArticles(@Body() articles: CoursesPostDto): Promise<void> {
    return this._coursesService.upsertArticles(articles);
  }

  @Put('quantity/:id')
  updateQuantity(@Param('id') id: number, @Body() quantity: CoursesQuantityDto): Promise<void> {
    return this._coursesService.updateQuantity(id, quantity);
  }

  @Put('purchased/:id')
  updatePurchasedStatus(@Param('id') id: number, @Body() purchased: CoursesPurchasedDto): Promise<void> {
    return this._coursesService.updatePurchasedStatus(id, purchased);
  }

  @Delete()
  removeArticles(): Promise<CoursesArticleList[]> {
    return this._coursesService.removeArticles();
  }
}
