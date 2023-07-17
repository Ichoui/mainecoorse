import './articles.scss';
import { Item } from '@components/item/item';
import { ArticleTags, ItemBase, ItemType } from '@shared-interfaces/items';
import { Autocomplete, Chip, Fab, TextField } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useAxios } from '@shared/hooks/useAxios.hook';

export const Articles = (): JSX.Element => {
  const articles: ItemBase[] = [
    {
      id: 1,
      itemType: ItemType.ARTICLE,
      label: 'Dentifrice',
      url: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
      tags: [ArticleTags.EPICERIE],
      description: 'ceci est du dentrifrice ok ?',
    },
    {
      id: 13,
      itemType: ItemType.ARTICLE,
      label: 'Pingouin',
      url: 'https://helvident.ch/wp-content/uploads/2020/03/choisir-un-dentifrice-HELVIDENT-1024x683.jpg',
      tags: [ArticleTags.EPICERIE],
      description: 'ceci est du dentrifrice ok ?',
    },
    {
      id: 2,
      itemType: ItemType.ARTICLE,
      label: 'Munstère',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE],
      description: 'Allez le munster!',
    },
    {
      id: 3,
      itemType: ItemType.ARTICLE,
      label: 'Munster',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 5,
      itemType: ItemType.ARTICLE,
      label: 'Munster aux olives basques ',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 6,
      itemType: ItemType.ARTICLE,
      label: 'Munsteur',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.BOULANGERIE, ArticleTags.LAITAGE],
      description: 'Allez le munster!',
    },
    {
      id: 7,
      itemType: ItemType.ARTICLE,
      label: 'Munsteir',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 8,
      itemType: ItemType.ARTICLE,
      label: 'Munstezaer',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 9,
      itemType: ItemType.ARTICLE,
      label: 'Munstaer',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
    {
      id: 10,
      itemType: ItemType.ARTICLE,
      label: 'Munstere',
      url: 'https://img-3.journaldesfemmes.fr/jSfD848yzUP8lhZYyue6Dv57I7o=/1500x/smart/c7a5593e8bd74911abdcdee8e23fccd4/ccmcms-jdf/35284182.jpg',
      tags: [ArticleTags.LEGUMES],
      description: 'Allez le munster!',
    },
  ];

  const { data, error, loaded } = useAxios('http://localhost:3945/api/mc/articles', 'GET');

  // @ts-ignore
  const articlesTags = Object.values(ArticleTags);
  const [filteredArticles, setFilteredArticles] = useState<ItemBase[]>(articles);

  const handleSearch = useDebouncedCallback(value => {
    const filter = articles.filter(f => f.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredArticles(filter.length > 0 ? filter : articles);
  }, 200);

  const handleTags = (e: object, tags: ArticleTags[]) => {
    const filter = articles.reduce((acc: ItemBase[], curr: ItemBase) => {
      tags.forEach(tag => {
        if (curr.tags.includes(tag)) {
          acc.push(curr);
        }
      });
      return acc;
    }, []);
    setFilteredArticles(filter.length > 0 ? filter : articles);
  };

  return (
    <div className='Articles'>
      <div className='filters'>
        <TextField
          label='Rechercher'
          placeholder='Ca recherche quoi ?'
          variant='outlined'
          onChange={e => handleSearch(e.target.value)}
          size='small'
        ></TextField>

        <Autocomplete
          multiple
          className='inputs'
          size='small'
          limitTags={2}
          options={articlesTags}
          filterSelectedOptions={true}
          renderTags={(tags: readonly ArticleTags[], getTagProps) => {
            return tags.map((option: ArticleTags, index: number) => (
              <Chip variant='outlined' label={option} {...getTagProps({ index })} />
            ));
          }}
          onChange={(e: object, tags: ArticleTags[]) => handleTags(e, tags)}
          renderInput={params => <TextField {...params} variant='outlined' label='Tags' />}
        />
      </div>

      <div className='listing'>
        {filteredArticles.map((article, i) => (
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
