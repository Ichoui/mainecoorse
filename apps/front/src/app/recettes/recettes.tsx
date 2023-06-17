import './recettes.scss';
import { Item } from '@components/item/item';
import { ItemBase } from '@shared-interfaces/items';
import { Fab } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';

export const Recettes = (): JSX.Element => {
  const recettes: ItemBase[] = [
    {
      id: 1,
      label: 'Dentifrice',
      webImage: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
      tags: [],
      description: 'ceci est du dentrifrice ok ?',
      articlesList: [],
    },
    {
      id: 2,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster aux olives basques ',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
    {
      id: 3,
      label: 'Munster',
      webImage:
        'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [],
      description: 'Allez le munster!',
      articlesList: [],
    },
  ];

  return (
    <div className='recettes'>
      <div className='filters'></div>
      <Outlet />

      <div className='listing'>
        {recettes.map((recette, i) => (
          <Item key={i} item={recette} isArticle={false} />
        ))}
      </div>

      <Fab className='add' color='primary' size='small' aria-label='add new recette' component={Link} to='/recette/new'>
        <AddRounded />
      </Fab>
    </div>
  );
};
