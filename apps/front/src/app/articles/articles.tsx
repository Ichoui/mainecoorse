import './articles.scss';
import { Item } from '@components/item/item';

export interface ItemBase {
  webImage: string;
  description: string;
  id: string;
  label: string;
}
export interface ItemRecette extends ItemBase {
  articleRecettes: any[];
  truc?: string;
}
export interface ItemArticles extends ItemBase {
  articleTags: any[];
  machin?: string;
}

export const Articles = (): JSX.Element => {
  const articles: ItemArticles[] = [
    {
      id: '1',
      label: 'Dentifrice',
      webImage: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
      articleTags: [],
      description: 'ceci est du dentrifrice ok ?',
    },
    {
      id: '2',
      label: 'Munster',
      webImage: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      articleTags: [],
      description: 'Allez le munster!',
    },
    {
      id: '3',
      label: 'Munster',
      webImage: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      articleTags: [],
      description: 'Allez le munster!',
    },
  ];

  return (
    <div className='articles'>
      {articles.map((article, i) => (
        <Item key={i} item={article} isArticle={true} />
      ))}
    </div>
  );
};
