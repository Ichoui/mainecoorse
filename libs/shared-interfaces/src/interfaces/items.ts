export const enum ItemType {
  ARTICLE = 'article',
  RECETTE = 'recette',
}

export interface ItemBase {
  id: number;
  itemType: ItemType;
  description: string;
  url: string;
  label: string;
  tags: Tags[];
  articlesList?: ArticleList[];
}

export type ArticleList = Omit<ItemBase, 'articlesList' | 'itemType'> & { quantity: number };

export interface Days {
  label: string;
  id: number;
  slug: string;
  items: ItemBase[] | never[];
}


export interface IIngredientsWithQte {
  ingredient: IIngredient;
  quantity?: number;
}

export interface IIngredient {
  label: string;
  id: number;
}

// https://stackoverflow.com/questions/48478361/how-to-merge-two-enums-in-typescript
export type Tags = ArticleTags | RecetteTags;

export const enum ArticleTags {
  VIANDE = 'Viande',
  POISSON = 'Poisson',
  BOULANGERIE = 'Boulangerie',
  FRUITS = 'Fruits',
  LEGUMES = 'Légumes',
  EPICERIE = 'Epicerie',
  LAITAGE = 'Laitage',
  ENTRETIEN = 'Entretien',
  HYGIENE = 'Hygiène',
  BOISSONS = 'Boissons',
  DIVERS = 'Divers',
}

export const enum RecetteTags {
  ENTREE = 'Entrée',
  PLAT = 'Plat',
  DESSERT = 'Dessert',
  BOISSON = 'Boisson',
  PETIT_DEJEUNER = 'Petit déjeuner',
  ETE = 'Eté',
  HIVER = 'Hiver',
  COURT = 'Court',
  MOYEN = 'Moyen',
  LONG = 'Long',
}

export interface Courses {
  id: number;
  articlesList: ArticleList[];
  tags: Tags[];
}
