import { Injectable } from '@nestjs/common';
import { Days, EDays, ItemBase } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysEntity } from './days.entity';
import { Repository } from 'typeorm';
import { SkeletonDays } from '@shared-interfaces/days';

type ItemBaseWithSlug = ItemBase & { slug: EDays };

@Injectable()
export class DaysService {
  constructor(@InjectRepository(DaysEntity) private _daysEntityRepository: Repository<DaysEntity>) {}

  async getCalendarDays(): Promise<Days[]> {
    // const t = [
    //   {
    //     label: 'Samedi',
    //     id: 0,
    //     slug: 'saturday',
    //     items: [
    //       {
    //         id: 14,
    //         label: 'boule',
    //         itemType: ItemType.ARTICLE,
    //         description: 'Ma description',
    //         url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
    //         tags: [ArticleTags.EPICERIE],
    //       },
    //       {
    //         id: 13,
    //         label: 'djak',
    //         itemType: ItemType.ARTICLE,
    //         description: 'Ma description',
    //         url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
    //         tags: [ArticleTags.BOISSONS],
    //       },
    //       {
    //         id: 8,
    //         label: 'Oignon',
    //         itemType: ItemType.RECETTE,
    //         description: 'C est pas bon',
    //         tags: [RecetteTags.PLAT],
    //         url: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
    //         articlesList: [
    //           {
    //             id: 12,
    //             label: 'Sympa hnon?',
    //             quantity: 5,
    //             description: 'azerdftghjklm',
    //             tags: [RecetteTags.COURT],
    //             url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   { label: 'Dimanche', id: 1, slug: 'sunday', items: [] },
    //   {
    //     label: 'Lundi',
    //     id: 2,
    //     slug: 'monday',
    //     items: [
    //       {
    //         id: 9,
    //         label: 'Frites',
    //         itemType: ItemType.ARTICLE,
    //         description: 'Ma description',
    //         url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
    //         tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    //       },
    //     ],
    //   },
    //   {
    //     label: 'Mardi',
    //     id: 3,
    //     slug: 'tuesday',
    //     items: [
    //       {
    //         id: 10,
    //         label: 'Recette2',
    //         itemType: ItemType.RECETTE,
    //         description:
    //           'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
    //         url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
    //         tags: [RecetteTags.ENTREE, RecetteTags.LONG, RecetteTags.DESSERT],
    //         articlesList: [
    //           {
    //             id: 9,
    //             label: 'frater',
    //             quantity: 5,
    //             description: 'azerdftghjklm',
    //             tags: [RecetteTags.COURT],
    //             url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   { label: 'Mercredi', id: 4, slug: 'wednesday', items: [] },
    //   { label: 'Jeudi', id: 5, slug: 'thursday', items: [] },
    //   { label: 'Vendredi', id: 6, slug: 'friday', items: [] },
    // ];

    const queryRecette: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select(
        'recette.articlesList, recette.id, recette.label, recette.description, recette.url, recette.tags, recette.itemType, days.slug',
      )
      .leftJoin('days.recetteId', 'recette')
      .where('days.recetteId is not null')
      .getRawMany();

    const queryArticle: ItemBaseWithSlug[] = await this._daysEntityRepository
      .createQueryBuilder('days')
      .select('article.id, article.label, article.description, article.url, article.tags, article.itemType, days.slug')
      .leftJoin('days.articleId', 'article')
      .where('days.articleId is not null')
      .getRawMany();

    const itemsRequested: ItemBaseWithSlug[] = queryRecette.concat(queryArticle).sort((a, b) => a.id - b.id);
    SkeletonDays.forEach(day => (day.items = itemsRequested.filter(item => item.slug === day.slug)));
    return SkeletonDays
  }

  async putCalendarDay(): Promise<ItemBase> {
    return null;
  }

  async deleteCalendarDay(): Promise<void> {


  }
}
