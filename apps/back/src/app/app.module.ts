import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';
import { CalendarModule } from './calendar/calendar.module';
import { NotesModule } from './notes/notes.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ArticlesModule, RecettesModule, CalendarModule, NotesModule, CoursesModule],
})
export class AppModule {}
