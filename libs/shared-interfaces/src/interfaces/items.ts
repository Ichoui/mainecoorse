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

export type ArticleList = Omit<ItemBase, 'articlesList' | 'itemType' | 'tags'>;

export interface Courses {
  id: number;
  articlesList: ArticleList[];
  tags: Tags[];
}

export const enum Tags {
  FRAIS = 'frais',
  POISSON = 'poisson',
  VIANDE = 'viande',
  HIVER = 'hiver',
}
