import { Injectable } from '@nestjs/common';
import { Days, EDays, ItemBase } from '@shared-interfaces/items';
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
        'recette.articlesList, recette.id, recette.label, recette.description, recette.url, recette.tags, recette.itemType, days.slug, days.id as "tableIdentifier"'
      )
      .leftJoin('days.recetteId', 'recette')
      .where('days.recetteId is not null')
      .getRawMany();

    const queryArticle: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select('article.id, article.label, article.description, article.url, article.tags, article.itemType, days.slug, days.id as "tableIdentifier"')
      .leftJoin('days.articleId', 'article')
      .where('days.articleId is not null')
      .getRawMany();

    const itemsRequested: ItemBaseWithSlug[] = queryRecette.concat(queryArticle).sort((a, b) => a.id - b.id);
    SkeletonDays.forEach(day => (day.items = itemsRequested.filter(item => item.slug === day.slug)));
    return SkeletonDays;
  }

  async putCalendarDay(days: DaysDto): Promise<ItemBase> {
    return null;
  }

  async deleteCalendarDay(id: number): Promise<void> {}
}
