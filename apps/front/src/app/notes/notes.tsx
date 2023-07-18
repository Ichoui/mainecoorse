import './notes.scss';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAxios } from '@shared/hooks/useAxios.hook';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';

export const Notes = () => {
  const [value, setValue] = useState<string>('');
  const { data, error, loaded } = useAxios('notes', 'GET');

  useEffect(() => {
    setValue(data);
  }, [data, loaded, error]);

  const handleChange = useDebouncedCallback(value => {
    setValue(value);
    // TODO to API here!
  }, 500);

  return (
    <div className='Notes'>
      <h2>Pense-bête</h2>
      {!loaded && <Loader />}
      {error && <DataError />}
      {loaded && !error && (
        <TextField
          variant='outlined'
          label='Notes'
          defaultValue={value ?? ' '}
          placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'
          onChange={e => handleChange(e.target.value)}
          minRows={5}
          multiline
        ></TextField>
      )}
    </div>
  );
};
