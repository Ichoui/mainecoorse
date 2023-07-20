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

export enum ArticleTags {
  VIANDE = 'Viande',
  POISSON = 'Poisson',
  BOULANGERIE = 'Boulangerie',
  FRUITS = 'Fruits',
  LEGUMES = 'Légumes',
  EPICERIE = 'Epicerie',
  LAITAGE = 'Laitage',
  ENTRETIEN = 'Entretien',
  HYGIENE = 'Hygiène',
  BOISSON = 'Boisson',
  DIVERS = 'Divers',
}

export enum RecetteTags {
  ENTREE = 'Entrée',
  PLAT = 'Plat',
  DESSERT = 'Dessert',
  DEJEUNER = 'Déjeuner',
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

export interface ISnackbar {
  open: boolean;
  message?: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
}
