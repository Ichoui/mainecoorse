import { Injectable } from '@nestjs/common';
import { ItemBase } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { DiversEntity } from './divers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiversService {
  constructor(@InjectRepository(DiversEntity) private _diversEntityRepository: Repository<DiversEntity>) {}

  async getCalendarDiversItems(): Promise<ItemBase[]> {
    const queryRecette: ItemBase[] = await this._diversEntityRepository
      .createQueryBuilder('divers')
      .select(
        'recette.articlesList, recette.id, recette.label, recette.description, recette.url, recette.tags, recette.itemType',
      )
      .leftJoin('divers.recetteId', 'recette')
      .where('divers.recetteId is not null')
      .getRawMany();

    const queryArticle: ItemBase[] = await this._diversEntityRepository
      .createQueryBuilder('divers')
      .select('article.id, article.label, article.description, article.url, article.tags, article.itemType')
      .leftJoin('divers.articleId', 'article')
      .where('divers.articleId is not null')
      .getRawMany();

    return queryRecette.concat(queryArticle);
  }

  async putCalendarDiversItem(): Promise<any[]> {
    // const entity = this._diversEntityRepository.create({});
    // if (!entity) {
    //   throw new NotFoundException();
    // }
    //
    // return this._diversEntityRepository.save(entity);
    return [];
  }

  async deleteCalendarDiversItem(): Promise<void> {}
}
