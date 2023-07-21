import './recettes.scss';
import { Item } from '@components/item/item';
import { ItemBase, RecetteTags } from '@shared-interfaces/items';
import { Autocomplete, Chip, Fab, TextField } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import MapleNoResults from '/maple-no-results.png';
import { configAxios } from '@shared/hooks/axios.config';

export const Recettes = (): JSX.Element => {
  const [{ data, error, loading }, refetchRecettes] = configAxios({
    url: 'recettes',
    method: 'GET',
    autoCancel: false,
  });
  const [recettes, setRecettes] = useState<ItemBase[]>([]);
  const [filteredRecettes, setFilteredRecettes] = useState<ItemBase[]>([]);
  // @ts-ignore
  const recettesTags = Object.values(RecetteTags);

  useEffect(() => {
    setRecettes(data);
    setFilteredRecettes(data);
  }, [data, loading, error]);

  const handleSearch = useDebouncedCallback(value => {
    const filter = recettes?.filter(f => f.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredRecettes(filter.length > 0 ? filter : recettes);
  }, 200);

  const handleTags = (e: object, tags: RecetteTags[]) => {
    const filter = recettes?.reduce((acc: ItemBase[], curr: ItemBase) => {
      tags.forEach(tag => {
        if (curr.tags.includes(tag)) {
          acc.push(curr);
        }
      });
      return acc;
    }, []);
    setFilteredRecettes(tags.length > 0 ? filter : recettes);
  };

  return (
    <div className='Recettes'>
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
          options={recettesTags}
          filterSelectedOptions={true}
          renderTags={(tags: readonly RecetteTags[], getTagProps) => {
            return tags.map((option: RecetteTags, index: number) => (
              <Chip variant='outlined' label={option} {...getTagProps({ index })} />
            ));
          }}
          onChange={(e: object, tags: RecetteTags[]) => handleTags(e, tags)}
          renderInput={params => <TextField {...params} variant='outlined' label='Tags' />}
        />
      </div>

      {loading && <Loader />}
      {error && <DataError />}

      <div className='listing'>
        {filteredRecettes?.map((recette, i) => (
          <Item key={i} item={recette} itemRemoved={() => refetchRecettes()} />
        ))}
        {filteredRecettes?.length === 0 && !loading && !error && (
          <div className='no-results'>
            <img src={MapleNoResults} alt='Aucun résultats' />
          </div>
        )}
      </div>

      <Fab
        className='add'
        color='secondary'
        size='small'
        aria-label='add new recette'
        component={Link}
        to='/recette/new'
      >
        <AddRounded />
      </Fab>
    </div>
  );
};
