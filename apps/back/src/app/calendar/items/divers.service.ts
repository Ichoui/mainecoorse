import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { DiversEntity } from './divers.entity';
import { Repository } from 'typeorm';
import { DiversDto } from './divers.dto';

@Injectable()
export class DiversService {
  constructor(@InjectRepository(DiversEntity) private _diversEntityRepository: Repository<DiversEntity>) {}

  async getCalendarDiversItems(): Promise<ItemBase[]> {
    const queryRecette: ItemBase[] = await this._diversEntityRepository
      .createQueryBuilder('divers')
      .select(
        'recette.articlesList, recette.id, recette.label, recette.description, recette.url, recette.tags, recette.itemType, divers.id as "tableIdentifier"',
      )
      .leftJoin('divers.recetteId', 'recette')
      .where('divers.recetteId is not null')
      .getRawMany();

    const queryArticle: ItemBase[] = await this._diversEntityRepository
      .createQueryBuilder('divers')
      .select('article.id, article.label, article.description, article.url, article.tags, article.itemType, divers.id as "tableIdentifier"')
      .leftJoin('divers.articleId', 'article')
      .where('divers.articleId is not null')
      .getRawMany();

    return queryRecette.concat(queryArticle);
  }

  async putCalendarDiversItem(divers: DiversDto): Promise<ItemBase[]> {
    const diversType = divers.type === ItemType.RECETTE ? { recetteId: divers.itemId } : { articleId: divers.itemId };
    const entity = this._diversEntityRepository.create({ ...diversType });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._diversEntityRepository.save(entity);
    return this.getCalendarDiversItems();
  }

  async deleteCalendarDiversItem(id: number): Promise<void> {
    const entity = await this._diversEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._diversEntityRepository.remove(entity);
  }
}
