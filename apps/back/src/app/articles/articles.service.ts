import { Injectable } from '@nestjs/common';
import { ArticleTags, ItemBase, ItemType } from '@shared-interfaces/items';

@Injectable()
export class ArticlesService {
  getArticles(): ItemBase[] {
    const articles: ItemBase[] = [
      {
        id: 1,
        itemType: ItemType.ARTICLE,
        label: 'Dentifrice',
        url: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
        tags: [ArticleTags.EPICERIE],
        description: 'ceci est du dentrifrice ok ?',
      },
      {
        id: 13,
        itemType: ItemType.ARTICLE,
        label: 'Pingouin',
        url: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
        tags: [ArticleTags.EPICERIE],
        description: 'ceci est du dentrifrice ok ?',
      },
      {
        id: 2,
        itemType: ItemType.ARTICLE,
        label: 'Munstère',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.BOULANGERIE],
        description: 'Allez le munster!',
      },
      {
        id: 3,
        itemType: ItemType.ARTICLE,
        label: 'Munster',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
        description: 'Allez le munster!',
      },
      {
        id: 5,
        itemType: ItemType.ARTICLE,
        label: 'Munster aux olives basques ',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
        description: 'Allez le munster!',
      },
      {
        id: 6,
        itemType: ItemType.ARTICLE,
        label: 'Munsteur',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
        description: 'Allez le munster!',
      },
      {
        id: 7,
        itemType: ItemType.ARTICLE,
        label: 'Munsteir',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.LEGUMES],
        description: 'Allez le munster!',
      },
      {
        id: 8,
        itemType: ItemType.ARTICLE,
        label: 'Munstezaer',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.LEGUMES],
        description: 'Allez le munster!',
      },
      {
        id: 9,
        itemType: ItemType.ARTICLE,
        label: 'Munstaer',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.LEGUMES],
        description: 'Allez le munster!',
      },
      {
        id: 10,
        itemType: ItemType.ARTICLE,
        label: 'Munstere',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [ArticleTags.LEGUMES],
        description: 'Allez le munster!',
      },
    ];

    // return { message: 'Hello API' };
    return articles;
  }
}
