import './tags.scss';

export const Tags = () => {
  return (<div>here its tags

    {/*      <Autocomplete
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
      />*/}
  </div>);
};
