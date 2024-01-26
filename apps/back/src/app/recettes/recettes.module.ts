import { Module } from '@nestjs/common';
import { RecettesService } from './recettes.service';
import { RecettesController } from './recettes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecettesEntity } from './recettes.entity';
import { CalendarModule } from '../calendar/calendar.module';
import { RecetteArticleModule } from '../recette-article/recette-article.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecettesEntity]), RecetteArticleModule, CalendarModule, SettingsModule],
  controllers: [RecettesController],
  providers: [RecettesService],
  exports: [RecettesService],
})
export class RecettesModule {}
