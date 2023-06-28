import './notes.scss';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const Notes = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = useDebouncedCallback(value => {
    setValue(value);
    // TODO to API here!
  }, 500);

  return (
    <div className='Notes'>
      <h2>Pense-bête</h2>
      <TextField
        variant='outlined'
        label='Notes'
        defaultValue={value}
        placeholder='Pense, écrit, tape, romance, transcrit, compose, exprime, rédige, consigne, note... 🗒️'
        onChange={e => handleChange(e.target.value)}
        minRows={5}
        multiline
      ></TextField>
    </div>
  );
};
