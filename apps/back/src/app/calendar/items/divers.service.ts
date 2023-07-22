import { Injectable } from '@nestjs/common';
import { ArticleTags, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { InjectRepository } from '@nestjs/typeorm';
import { DiversEntity } from './divers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiversService {
  constructor(@InjectRepository(DiversEntity) private _diversEntityRepository: Repository<DiversEntity>) {}

  async getCalendarDiversItems(): Promise<ItemBase[]> {
    const calendarItems: ItemBase[] = [
      {
        id: 1,
        label: 'Article 1',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
      },
      {
        id: 3,
        label: 'Article 2',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
      },
      {
        id: 4,
        label: 'Article 3',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
      },
      {
        id: 5,
        label: 'Article 4',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
      },
      {
        id: 8,
        label: 'Article 14',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
      },
      {
        id: 2,
        label: 'Recette1 1',
        itemType: ItemType.RECETTE,
        description:
          'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [RecetteTags.ENTREE, RecetteTags.LONG, RecetteTags.DESSERT],
        articlesList: [
          {
            id: 7,
            label: 'Frites',
            quantity: 5,
            description: 'Les frites belges ou les frites ricaines ?',
            tags: [RecetteTags.COURT],
            url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
          },
        ],
      },
    ];

    const query = this._diversEntityRepository
      .createQueryBuilder('a')
      .select('*')
      .where('a.id is not null')
      // .leftJoinAndSelect('a.articleId', 'articles') //
      .orderBy({ id: 'ASC' })
      .getRawMany();

    console.log(query);

    return calendarItems;
  }

  putCalendarDiversItems() {
    return [];
  }
}
