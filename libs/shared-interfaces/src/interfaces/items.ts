export enum ItemType {
  ARTICLE = 'article',
  RECETTE = 'recette',
}

export interface ItemBase {
  id: number; // article or recette id
  itemType: ItemType;
  description: string;
  url: string;
  label: string;
  tags: Tags[] | string[];
  articlesList?: ArticleList[];

  tableIdentifier?: number; // calendar Items, from days or divers table
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
  slug: EDays;
  items: ItemBase[];
}

export interface ItemsDays {
  id: number;
  slug: string;
  item: ItemBase;
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

export enum EDays {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export const translateDays = (day: EDays): string => {
  switch (day) {
    case EDays.MONDAY:
      return 'Lundi';
    case EDays.TUESDAY:
      return 'Mardi';
    case EDays.WEDNESDAY:
      return 'Mercredi';
    case EDays.THURSDAY:
      return 'Jeudi';
    case EDays.FRIDAY:
      return 'Vendredi';
    case EDays.SATURDAY:
      return 'Samedi';
    case EDays.SUNDAY:
      return 'Dimanche';
    default:
      return 'Un jour buggé !';
  }
};
