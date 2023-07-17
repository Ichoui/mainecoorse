import { Injectable } from '@nestjs/common';
import { ArticleTags, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';

@Injectable()
export class RecettesService {
  getRecettes(): ItemBase[] {
    const recettes: ItemBase[] = [
      {
        id: 1,
        itemType: ItemType.RECETTE,
        label: 'Dentifrice',
        url: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
        tags: [RecetteTags.ENTREE],
        description: 'ceci est du dentrifrice ok ?',
        articlesList: [],
      },
      {
        id: 14,
        label: 'Oignon',
        itemType: ItemType.RECETTE,
        description: 'C est pas bon',
        tags: [RecetteTags.PLAT],
        url: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
        articlesList: [
          {
            id: 12,
            label: 'Ingredient A',
            quantity: 8,
            description: 'azerdftghjklm',
            tags: [ArticleTags.LEGUMES],
            url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
          },
          {
            id: 15,
            label: 'Ingredient de type laitage B',
            quantity: 5,
            description: 'azerdftghjklm',
            tags: [ArticleTags.LAITAGE],
            url: 'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
          },
        ],
      },
      {
        id: 2,
        itemType: ItemType.RECETTE,
        label: 'Munstar',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.DESSERT],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munsteir',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munster aux olives basques ',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.PLAT],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munster',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.MOYEN],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munsterrrr',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.PLAT],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munsteuer',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.PLAT],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munstar',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.LONG],
        description: 'Allez le munster!',
        articlesList: [],
      },
      {
        id: 3,
        itemType: ItemType.RECETTE,
        label: 'Munsr',
        url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
        tags: [RecetteTags.LONG],
        description: 'Allez le munster!',
        articlesList: [],
      },
    ];

    return recettes;
  }
}
