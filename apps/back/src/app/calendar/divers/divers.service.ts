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
      .leftJoin('divers.recette', 'recette')
      .leftJoin('recette.recetteArticle', 'recetteArticle')
      .leftJoin('recetteArticle.article', 'article')
      .select([
        'divers.id',
        'recette.id',
        'recette.label',
        'recette.description',
        'recette.url',
        'recette.tags',
        'recette.itemType',
        'recetteArticle.quantity',
        'article.id',
        'article.label',
      ])
      .where('divers.recette is not null')
      .getMany()
      .then(res =>
        res.map(r => ({
          tableIdentifier: r.id,
          id: r.recette.id,
          label: r.recette.label,
          description: r.recette.description,
          url: r.recette.url,
          tags: r.recette.tags,
          itemType: r.recette.itemType,
          articlesList: r.recette.recetteArticle.map(ra => ({
            id: ra.article.id,
            quantity: ra.quantity,
            label: ra.article.label,
          })),
        })),
      );

    const queryArticle: ItemBase[] = await this._diversEntityRepository
      .createQueryBuilder('divers')
      .select(
        'article.id, article.label, article.description, article.url, article.tags, article.itemType, divers.id as "tableIdentifier"',
      )
      .leftJoin('divers.article', 'article')
      .where('divers.article is not null')
      .getRawMany();

    return queryRecette.concat(queryArticle);
  }

  async putCalendarDiversItem(divers: DiversDto): Promise<ItemBase[]> {
    const diversType = divers.type === ItemType.RECETTE ? { recetteId: divers.itemId } : { articleId: divers.itemId };
    const entity: DiversEntity[] = [];
    if (divers.quantity) {
      for (let i = 0; i < divers.quantity; i++) {
        entity.push(this._diversEntityRepository.create({ ...diversType }));
      }
    }
    if (!entity && entity.length > 0) {
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

  async removeForbiddenIfExisting(id: number, type: ItemType): Promise<string> {
    const value = type === ItemType.RECETTE ? { recetteId: id } : { articleId: id };
    const existing = await this._diversEntityRepository.findOneBy(value);
    if (existing) {
      return 'calendrier (divers)';
    }
  }
}
