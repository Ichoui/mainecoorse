import { Module } from '@nestjs/common';
import { RecettesService } from './recettes.service';
import { RecettesController } from './recettes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecettesEntity } from './recettes.entity';
import { CalendarModule } from '../calendar/calendar.module';
import { RecetteArticleModule } from '../recette-article.entity.ts/recette-article.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecettesEntity]), RecetteArticleModule, CalendarModule],
  controllers: [RecettesController],
  providers: [RecettesService],
  exports: [RecettesService],
})
export class RecettesModule {}
