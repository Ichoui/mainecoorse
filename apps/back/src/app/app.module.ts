import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';

@Module({
  imports: [ArticlesModule, RecettesModule],
})
export class AppModule {}
