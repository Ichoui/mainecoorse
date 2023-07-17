import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { RecettesModule } from './recettes/recettes.module';

@Module({
  imports: [ArticlesModule, RecettesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
