import './notes.scss';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { axiosUrl, configAxios, fetchApi, headers } from '@shared/hooks/axios.config';
import useAxios from 'axios-hooks';

export const Notes = (): JSX.Element => {
  // const [{ data: getData, loading: getLoading, error: getError }, refetchData] =
  //   configAxios({
  //   url: 'notes',
  //   method: 'GET',
  //   autoCancel: false,
  //   });

  fetchApi('notes', 'GET')

    //
    // useAxios(
    //   {
    //     headers,
    //     url: axiosUrl('notes'),
    //     method: 'GET',
    //   },
    //   { autoCancel: false },
    // );

  // eslint-disable-next-line no-empty-pattern
  const [{}, executePost] = useAxios(
    {
      url: axiosUrl('notes'),
      method: 'POST',
      headers,
    },
    { manual: true },
  );

  //
  // eslint-disable-next-line no-empty-pattern
  // const [{}, executePost] = configAxios({ url: 'notes', method: 'POST', manual: true });

  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    // refetchData();
    console.log('eff');
  });

  const handleChange = useDebouncedCallback(notes => {
    setValue(notes);
    executePost({
      data: { notes },
    });
  }, 500);

  return (
    <div className='Notes'>
      <h2>Pense-bête</h2>
      {/*{getLoading && <Loader />}*/}
      {/*{getError && <DataError />}*/}
      {/*{!getLoading && !getError && (*/}
      {/*  <TextField*/}
      {/*    variant='outlined'*/}
      {/*    label='Notes'*/}
      {/*    defaultValue={value ?? getData}*/}
      {/*    placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'*/}
      {/*    onChange={e => handleChange(e.target.value)}*/}
      {/*    minRows={5}*/}
      {/*    multiline*/}
      {/*  ></TextField>*/}
      {/*)}*/}
    </div>
  );
};
