import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleTags, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { RecettesCreateDto, RecettesUpdateDto } from './recettes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecettesEntity } from './recettes.entity';

@Injectable()
export class RecettesService {
  constructor(@InjectRepository(RecettesEntity) private _recettesEntityRepository: Repository<RecettesEntity>) {}

  async getRecettes(): Promise<ItemBase[]> {
    const query = this._recettesEntityRepository
      .createQueryBuilder('a')
      .select('*')
      .where('a.id is not null')
      .orderBy({ id: 'ASC' })
      .getRawMany();
    if (!query) {
      throw new NotFoundException();
    }
    return query;
  }

  async postRecette(recette: RecettesCreateDto): Promise<ItemBase> {
    console.log(recette);
    const entity = this._recettesEntityRepository.create({ ...recette, itemType: ItemType.RECETTE });
    if (!entity) {
      throw new NotFoundException();
    }

    return this._recettesEntityRepository.save(entity);
  }

  async putRecette(id: number, recette: RecettesUpdateDto): Promise<ItemBase> {
    console.log(recette);
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._recettesEntityRepository.update({ id }, { ...recette });
    return this._recettesEntityRepository.findOneBy({ id });
  }

  async removeRecette(id: number): Promise<void> {
    console.log('removing!', id);
    const entity = await this._recettesEntityRepository.findOneBy({ id });
    await this._recettesEntityRepository.remove(entity);
  }
}
