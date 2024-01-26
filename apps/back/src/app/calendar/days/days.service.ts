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
      .leftJoin('days.recette', 'recette')
      .leftJoin('recette.recetteArticle', 'recetteArticle')
      .leftJoin('recetteArticle.article', 'article')
      .select([
        'days.id',
        'days.slug',
        'recette.id',
        'recette.label',
        'recette.description',
        'recette.url',
        'recette.link',
        'recette.tags',
        'recette.itemType',
        'recette.flag',
        'recette.complements',
        'recette.approved',
        'recetteArticle.quantity',
        'article.id',
        'article.label',
        'article.url',
      ])
      .where('days.recette is not null')
      .getMany()
      .then(res =>
        res.map(r => ({
          tableIdentifier: r.id,
          slug: r.slug,
          id: r.recette.id,
          label: r.recette.label,
          description: r.recette.description,
          url: r.recette.url,
          link: r.recette.link,
          tags: r.recette.tags,
          itemType: r.recette.itemType,
          flag: r.recette.flag,
          complements: r.recette.complements,
          approved: r.recette.approved,
          articlesList: r.recette.recetteArticle.map(ra => ({
            id: ra.article.id,
            quantity: ra.quantity,
            label: ra.article.label,
            url: ra.article.url,
          })),
        })),
      );

    const queryArticle: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select(
        'article.id, article.label, article.description, article.url, article.tags, article.itemType, days.slug, days.id as "tableIdentifier"',
      )
      .leftJoin('days.article', 'article')
      .where('days.article is not null')
      .getRawMany();

    if (!queryArticle) {
      throw new NotFoundException("Days : problème d'article");
    }
    if (!queryRecette) {
      throw new NotFoundException('Days : problème de recette');
    }

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
      throw new NotFoundException('L\'entité days n\'existe pas');
    }
    return await this._daysEntityRepository.save(entity).then(() => this.getCalendarDays());
  }

  async deleteCalendarDay(id: number): Promise<void> {
    const entity = await this._daysEntityRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException('Problème de supression dans les jours');
    }
    await this._daysEntityRepository.remove(entity);
  }

  async removeForbiddenIfExisting(id: number, type: ItemType): Promise<string> {
    const value = type === ItemType.RECETTE ? { recetteId: id } : { articleId: id };
    const existing = await this._daysEntityRepository.findOneBy(value);
    if (existing) {
      return 'calendrier (jours)';
    }
  }
}
