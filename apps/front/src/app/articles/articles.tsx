import './articles.scss';
import { Item } from '@components/item/item';
import { ArticleTags, ItemBase } from '@shared-interfaces/items';
import { Autocomplete, Chip, Fab, TextField } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAxios } from '@shared/hooks/useAxios.hook';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';

export const Articles = (): JSX.Element => {
  const { data, error, loaded } = useAxios('articles', 'GET');
  const [articles, setArticles] = useState<ItemBase[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ItemBase[]>([]);

  useEffect(() => {
    setArticles(data);
    setFilteredArticles(data);
  }, [data, loaded]);

  // @ts-ignore
  const articlesTags = Object.values(ArticleTags);

  const handleSearch = useDebouncedCallback(value => {
    const filter = articles?.filter(f => f.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredArticles(filter.length > 0 ? filter : articles);
  }, 200);

  const handleTags = (e: object, tags: ArticleTags[]) => {
    const filter = articles?.reduce((acc: ItemBase[], curr: ItemBase) => {
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
            return tags?.map((option: ArticleTags, index: number) => (
              <Chip variant='outlined' label={option} {...getTagProps({ index })} />
            ));
          }}
          onChange={(e: object, tags: ArticleTags[]) => handleTags(e, tags)}
          renderInput={params => <TextField {...params} variant='outlined' label='Tags' />}
        />
      </div>

      {!loaded && <Loader />}
      {error && <DataError />}

      <div className='listing'>
        {filteredArticles?.map((article, i) => (
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
