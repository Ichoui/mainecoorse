import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [ArticlesModule, RecettesModule, CalendarModule],
})
export class AppModule {}
