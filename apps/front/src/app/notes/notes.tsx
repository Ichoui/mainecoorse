import './notes.scss';
import { IconButton, TextField } from '@mui/material';
import React, { Fragment, useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@components/loaders/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { configAxios } from '@shared/hooks/axios.config';
import Map404 from '/map404.png';
import Maple from '/maple.png';
import { SnackbarContext } from '@app/app';
import { Flags } from '@components/flags/flags';

export const Notes = (): JSX.Element => {
  const [{ data: getData, loading: getLoading, error: getError }] = configAxios({
    url: 'notes',
    method: 'GET',
    autoCancel: false,
  });

  const [{ data: settingFlag, loading: getLoadingFlag, error: getFlagError }] = configAxios({
    url: 'settings/flag',
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
      .then(() => setSnackValues({ open: true, message: '🎶 Notes pour trop tard...', severity: 'success' }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error' }));
  }, 500);

  return (
    <div className='Notes'>
      <div className='wrapper'>
        {getLoading && getLoadingFlag && <Loader />}
        {(getError || getFlagError) && <DataError />}
        {!getLoading && !getError && !getFlagError && !getLoadingFlag && (
          <Fragment>
            <h2>Pense-bête</h2>
            <TextField
              variant='outlined'
              label='Notes'
              defaultValue={value ?? getData}
              placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'
              onChange={e => handleChange(e.target.value)}
              minRows={5}
              multiline
            ></TextField>
            <h2>Pays de bouffe</h2>
            <Flags setSnackValues={setSnackValues} settingFlag={settingFlag}></Flags>
          </Fragment>
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
    </div>
  );
};
