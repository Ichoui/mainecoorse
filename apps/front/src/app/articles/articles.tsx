import './articles.scss';
import { Item } from '@components/item/item';
import { ArticleTags, ItemBase, ItemType } from '@shared-interfaces/items';
import { Fab } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';

export const Articles = (): JSX.Element => {
  const articles: ItemBase[] = [
    {
      id: 1,
      itemType: ItemType.ARTICLE,
      label: 'Dentifrice',
      webImage: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
      tags: [ArticleTags.EPICERIE],
      description: 'ceci est du dentrifrice ok ?',
    },
    {
      id: 2,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster aux olives basques ',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
  ];

  return (
    <div className='Articles'>
      <div className='filters'></div>
      <Outlet />

      <div className='listing'>
        {articles.map((article, i) => (
          <Item key={i} item={article} />
        ))}
      </div>

      <Fab
        className='add'
        color='secondary'
        size='small'
        aria-label='add new article'
        component={Link}
        to='/article/new'
      >
        <AddRounded />
      </Fab>
    </div>
  );
};
