import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';
import { CalendarModule } from './calendar/calendar.module';
import { NotesModule } from './notes/notes.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ArticlesModule,
    RecettesModule,
    CalendarModule,
    NotesModule,
    CoursesModule,
  ],
})
export class AppModule {}
