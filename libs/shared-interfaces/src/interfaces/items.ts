export enum ItemType {
  ARTICLE = 'article',
  RECETTE = 'recette',
}

export interface ItemBase {
  id: number;
  itemType: ItemType;
  description: string;
  url: string;
  label: string;
  tags: Tags[] | string[];
  articlesList?: ArticleList[];
}

export interface ArticleList {
  id: number;
  description: string;
  url: string;
  label: string;
  tags: Tags[] | string[];
  quantity: number;
}

export interface Days {
  label: string;
  id: number;
  slug: string;
  items?: ItemBase[] | never[];
  articleId?: number;
  recetteId?: number;
}

/*export interface CalendarItems {

}*/

// https://stackoverflow.com/questions/48478361/how-to-merge-two-enums-in-typescript
export type Tags = ArticleTags | RecetteTags;

export enum ArticleTags {
  LEGUMES = 'Légumes',
  FRUITS = 'Fruits',
  VIANDES = 'Viandes',
  EPICERIE = 'Epicerie',
  LAITAGES = 'Laitages',
  BOULANGERIE = 'Boulangerie',
  ENTRETIEN = 'Entretien',
  HYGIENE = 'Hygiène',
  BOISSONS = 'Boissons',
  POISSONS = 'Poissons',
  DIVERS = 'Divers',
  MAPLE_SYRUP = 'Maple Syrup',
}

export enum RecetteTags {
  ENTREE = 'Entrée',
  PLAT = 'Plat',
  DESSERT = 'Dessert',
  PETIT_DEJEUNER = 'PetitDéjeuner',
  COURT = 'Court',
  MOYEN = 'Moyen',
  LONG = 'Long',
  ETE = 'Eté',
  HIVER = 'Hiver',
  MAPLE_LEAF = 'Maple Leaf',
}

export interface Courses {
  id: number;
  articlesList: ArticleList[];
  tags: Tags[];
}

export interface ISnackbar {
  open: boolean;
  message?: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
}
