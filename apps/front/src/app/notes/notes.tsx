import './notes.scss';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { configAxios } from '@shared/hooks/axios.config';

export const Notes = (): JSX.Element => {
  const [{ data: getData, loading: getLoading, error: getError }] = configAxios({
    url: 'notes',
    method: 'GET',
    autoCancel: false,
  });

  // eslint-disable-next-line no-empty-pattern
  const [{}, executePost] = configAxios({ url: 'notes', method: 'POST', manual: true });

  const [value, setValue] = useState<string | undefined>(undefined);

  const handleChange = useDebouncedCallback(notes => {
    setValue(notes);
    executePost({
      data: { notes },
    });
  }, 500);

  return (
    <div className='Notes'>
      <h2>Pense-bête</h2>
      {getLoading && <Loader />}
      {getError && <DataError />}
      {!getLoading && !getError && (
        <TextField
          variant='outlined'
          label='Notes'
          defaultValue={value ?? getData}
          placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'
          onChange={e => handleChange(e.target.value)}
          minRows={5}
          multiline
        ></TextField>
      )}
    </div>
  );
};
