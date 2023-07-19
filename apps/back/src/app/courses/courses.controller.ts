import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { ArticleList } from '@shared-interfaces/items';
import { ReqInterceptor } from '../../shared/interceptor.service';

@UseInterceptors(ReqInterceptor)
@Controller('courses')
export class CoursesController {
  constructor(private readonly _coursesService: CoursesService) {}

  @Get()
  getCourses(): ArticleList[] {
    return this._coursesService.getCourses();
  }
}
