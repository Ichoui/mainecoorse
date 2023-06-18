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
  articlesList?: ItemBase[];
}

export interface Tags {
  id: number;
  label: string;
}

export interface Courses {
  id: number;
  articlesList: ItemBase[];
  tags: Tags[];
}
