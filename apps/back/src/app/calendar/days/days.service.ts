import { Injectable, NotFoundException } from '@nestjs/common';
import { Days, EDays, ItemBase, ItemType } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysEntity } from './days.entity';
import { Repository } from 'typeorm';
import { SkeletonDays } from '@shared-interfaces/days';
import { DaysDto } from './days.dto';

type ItemBaseWithSlug = ItemBase & { slug: EDays };

@Injectable()
export class DaysService {
  constructor(@InjectRepository(DaysEntity) private _daysEntityRepository: Repository<DaysEntity>) {}

  async getCalendarDays(): Promise<Days[]> {
    const queryRecette: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select(
        'recette.articlesList, recette.id, recette.label, recette.description, recette.url, recette.tags, recette.itemType, days.slug, days.id as "tableIdentifier"',
      )
      .leftJoin('days.recetteId', 'recette')
      .where('days.recetteId is not null')
      .getRawMany();

    const queryArticle: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select(
        'article.id, article.label, article.description, article.url, article.tags, article.itemType, days.slug, days.id as "tableIdentifier"',
      )
      .leftJoin('days.articleId', 'article')
      .where('days.articleId is not null')
      .getRawMany();

    const itemsRequested: ItemBaseWithSlug[] = queryRecette.concat(queryArticle).sort((a, b) => a.id - b.id);
    SkeletonDays.forEach(day => (day.items = itemsRequested.filter(item => item.slug === day.slug)));
    return SkeletonDays;
  }

  async putCalendarDay(days: DaysDto): Promise<Days[]> {
    const daysType =
      days.type === ItemType.RECETTE
        ? { recetteId: days.itemId, slug: days.slug }
        : { articleId: days.itemId, slug: days.slug };
    const entity = this._daysEntityRepository.create({ ...daysType });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._daysEntityRepository.save(entity);
    return this.getCalendarDays();
  }

  async deleteCalendarDay(id: number): Promise<void> {
    const entity = await this._daysEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    }
    await this._daysEntityRepository.remove(entity);
  }
}
