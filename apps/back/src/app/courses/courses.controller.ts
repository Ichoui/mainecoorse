import { Controller, Get } from '@nestjs/common';

import { CoursesService } from './courses.service';
import { ArticleList } from '@shared-interfaces/items';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getCourses(): ArticleList[] {
    return this.coursesService.getCourses();
  }
}
