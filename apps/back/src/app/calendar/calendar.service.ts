import { Injectable } from '@nestjs/common';
import { ArticleTags, Days, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';

@Injectable()
export class CalendarService {
  getCalendarItems(): ItemBase[] {
    const calendarItems: ItemBase[] = [
      {
        id: 1,
        label: 'Article 1',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
      },
      {
        id: 3,
        label: 'Article 2',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
      },
      {
        id: 4,
        label: 'Article 3',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
      },
      {
        id: 5,
        label: 'Article 4',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
      },
      {
        id: 8,
        label: 'Article 14',
        itemType: ItemType.ARTICLE,
        description: 'Ma description',
        url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
        tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
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

    return calendarItems;
  }

  getCalendarDays(): Days[] {
    return [
      // {
      //   label: 'Samedi',
      //   id: 0,
      //   slug: 'saturday',
      //   items: [
      //     {
      //       id: 14,
      //       label: 'boule',
      //       itemType: ItemType.ARTICLE,
      //       description: 'Ma description',
      //       url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      //       tags: [ArticleTags.EPICERIE],
      //     },
      //     {
      //       id: 13,
      //       label: 'djak',
      //       itemType: ItemType.ARTICLE,
      //       description: 'Ma description',
      //       url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      //       tags: [ArticleTags.BOISSON],
      //     },
      //     {
      //       id: 8,
      //       label: 'Oignon',
      //       itemType: ItemType.RECETTE,
      //       description: 'C est pas bon',
      //       tags: [RecetteTags.PLAT],
      //       url: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
      //       articlesList: [
      //         {
      //           id: 12,
      //           label: 'Sympa hnon?',
      //           quantity: 5,
      //           description: 'azerdftghjklm',
      //           tags: [RecetteTags.COURT],
      //           url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // { label: 'Dimanche', id: 1, slug: 'sunday', items: [] },
      // {
      //   label: 'Lundi',
      //   id: 2,
      //   slug: 'monday',
      //   items: [
      //     {
      //       id: 9,
      //       label: 'Frites',
      //       itemType: ItemType.ARTICLE,
      //       description: 'Ma description',
      //       url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      //       tags: [ArticleTags.BOISSON, ArticleTags.EPICERIE],
      //     },
      //   ],
      // },
      // {
      //   label: 'Mardi',
      //   id: 3,
      //   slug: 'tuesday',
      //   items: [
      //     {
      //       id: 10,
      //       label: 'Recette2',
      //       itemType: ItemType.RECETTE,
      //       description:
      //         'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
      //       url: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      //       tags: [RecetteTags.ENTREE, RecetteTags.LONG, RecetteTags.DESSERT],
      //       articlesList: [
      //         {
      //           id: 9,
      //           label: 'frater',
      //           quantity: 5,
      //           description: 'azerdftghjklm',
      //           tags: [RecetteTags.COURT],
      //           url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // { label: 'Mercredi', id: 4, slug: 'wednesday', items: [] },
      // { label: 'Jeudi', id: 5, slug: 'thursday', items: [] },
      // { label: 'Vendredi', id: 6, slug: 'friday', items: [] },
    ];
  }
}
