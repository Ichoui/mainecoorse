import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesEntity } from './articles.entity';
import { CalendarModule } from '../calendar/calendar.module';
import { CoursesModule } from '../courses/courses.module';
import { RecettesModule } from '../recettes/recettes.module';
import { RecetteArticleModule } from '../recette-article/recette-article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticlesEntity]),
    RecetteArticleModule,
    CalendarModule,
    CoursesModule,
    RecettesModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
