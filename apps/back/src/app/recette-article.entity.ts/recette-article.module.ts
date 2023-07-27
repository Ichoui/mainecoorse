import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetteArticleEntity } from './recette-article.entity';
import { RecetteArticleService } from './recette-article.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecetteArticleEntity])],
  exports: [RecetteArticleService],
  providers: [RecetteArticleService]
})
export class RecetteArticleModule {}
