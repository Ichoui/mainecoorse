import { Module } from '@nestjs/common';
import { RecettesService } from './recettes.service';
import { RecettesController } from './recettes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecettesEntity } from './recettes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecettesEntity])],
  controllers: [RecettesController],
  providers: [RecettesService],
  exports: [RecettesService],
})
export class RecettesModule {}
