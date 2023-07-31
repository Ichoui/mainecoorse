import './notes.scss';
import { IconButton, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { configAxios } from '@shared/hooks/axios.config';
import Map404 from '/map404.png';
import Maple from '/maple.png';
import { SnackbarContext } from '@app/app';

export const Notes = (): JSX.Element => {
  const [{ data: getData, loading: getLoading, error: getError }] = configAxios({
    url: 'notes',
    method: 'GET',
    autoCancel: false,
  });
  const { setSnackValues } = useContext(SnackbarContext);

  // eslint-disable-next-line no-empty-pattern
  const [{}, executePost] = configAxios({ url: 'notes', method: 'POST', manual: true });

  const [value, setValue] = useState<string | undefined>(undefined);
  const [mapCoon, setMapCoon] = useState<boolean>(false);

  const handleChange = useDebouncedCallback(notes => {
    setValue(notes);
    executePost({
      data: { notes },
    })
      .then(() =>
        setSnackValues({ open: true, message: '🎶 Notes pour trop tard...', severity: 'success' }),
      )
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error' }));
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

      <IconButton aria-label='map-btn' className='map-btn' onClick={() => setMapCoon(!mapCoon)}>
        <img src={Maple} alt='map' />
      </IconButton>

      {mapCoon && (
        <div className='maple404test'>
          <img src={Map404} alt='TestMaple404' />
        </div>
      )}
    </div>
  );
};
