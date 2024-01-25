import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';
import { CalendarModule } from './calendar/calendar.module';
import { NotesModule } from './notes/notes.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../ormconfig';
import { PingModule } from './ping/ping.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ArticlesModule,
    RecettesModule,
    CalendarModule,
    NotesModule,
    CoursesModule,
    PingModule,
    SettingsModule
  ],
})
export class AppModule {}
