import './notes.scss';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAxios } from '@shared/hooks/useAxios.hook';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';

export const Notes = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const getNotes = useAxios('notes', 'GET');

  useEffect(() => {
    setValue(getNotes.data);
    console.log(getNotes.data);
  }, [getNotes.data]);

  const handleChange = useDebouncedCallback(value => {
    setValue(value);
    console.log(value);
    // postNotes = useAxios('notes', 'POST');
    // TODO to API here!
  }, 500);

  return (
    <div className='Notes'>
      <h2>Pense-bête</h2>
      {!getNotes.loaded && <Loader />}
      {getNotes.error && <DataError />}
      {getNotes.loaded && !getNotes.error && (
        <TextField
          variant='outlined'
          label='Notes'
          defaultValue={value ?? getNotes.data}
          placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'
          onChange={e => handleChange(e.target.value)}
          minRows={5}
          multiline
        ></TextField>
      )}
    </div>
  );
};
