
export interface ItemBase {
  webImage: string;
  description: string;
  id: number;
  label: string;
  tags: Tags[]
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
