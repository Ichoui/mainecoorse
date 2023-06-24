export const enum ItemType {
  ARTICLE = 'article',
  RECETTE = 'recette',
}

export interface ItemBase {
  id: number;
  itemType: ItemType;
  description: string;
  webImage: string;
  label: string;
  tags: Tags[];
  articlesList?: ArticleList[];
}

export type ArticleList = Omit<ItemBase, 'articlesList' | 'itemType'> & { quantity: number };

export interface Days {label: string; slug: string; items: ItemBase[] | never[]}



export interface IIngredientsWithQte {
  ingredient: IIngredient;
  quantity?: number;
}

export interface IIngredient {
  label: string;
  id: number;
}

// https://stackoverflow.com/questions/48478361/how-to-merge-two-enums-in-typescript
export type Tags = ArticleTags | RecetteTags


export const enum ArticleTags {
  VIANDE = 'viande',
  POISSON = 'poisson',
  BOULANGERIE = 'boulangerie',
  FRUITS = 'fruits',
  LEGUMES = 'légumes',
  EPICERIE = 'épicerie',
  LAITAGE = 'laitage',
  ENTRETIEN = 'entretien',
  HYGIENE = 'hygiène',
  BOISSONS = 'boissons',
  DIVERS = 'divers',
}

export const enum RecetteTags {
  ENTREE = 'entrée',
  PLAT = 'plat',
  DESSERT = 'dessert',
  BOISSON = 'boisson',
  PETIT_DEJEUNER = 'petit_dejeuner',
  ETE = 'été',
  HIVER = 'hiver',
  COURT = 'court',
  MOYEN = 'moyen',
  LONG = 'long',
}


export interface Courses {
  id: number;
  articlesList: ArticleList[];
  tags: Tags[];
}
