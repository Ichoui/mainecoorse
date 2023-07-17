import { Module } from '@nestjs/common';
import { RecettesService } from './recettes.service';
import { RecettesController } from './recettes.controller';

@Module({
  imports: [],
  controllers: [RecettesController],
  providers: [RecettesService],
  exports: [RecettesService],
})
export class RecettesModule {}
