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
{
  /*      <Autocomplete
        multiple
        className='inputs'
        size='small'
        value={values.ingredients}
        limitTags={2}
        options={listComplete}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderTags={(ingredients: readonly IIngredients[], getTagProps) => {
          return ingredients.map((option: IIngredients, index: number) => (
            <Chip variant='outlined' label={option.label} {...getTagProps({ index })} />
          ));
        }}
        onInputChange={handleChange}
        onChange={(e: object, ingredients: IIngredients[]) => {
          setFieldValue('ingredients', ingredients);
        }}
        renderInput={params => (
          <TextField
            {...params}
            helperText={touched.ingredients ? errors.ingredients : ''}
            error={touched.ingredients && Boolean(errors.ingredients)}
            onChange={handleChange}
            variant='outlined'
            label='Ingrédients'
            placeholder='Allez les ingrédients !'
          />
        )}
      />*/
}
