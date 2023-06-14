export interface ItemBase {
  webImage: string;
  description: string;
  id: number;
  label: string;
}

export interface ItemArticles extends ItemBase {
  articlesTags: Tags[];
}

export interface ItemRecette extends ItemBase {
  recettesTags: Tags[];
  articlesList: ItemArticles[];
}

export interface Tags {
  id: number;
  label: string;
}

export interface Courses {
  id: number;
  articlesList: ItemArticles[];
  tags: Tags[];
}
