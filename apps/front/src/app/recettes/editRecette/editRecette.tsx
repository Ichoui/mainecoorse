import './editRecette.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Autocomplete, Button, Chip, IconButton, Input, MenuItem, Select, TextField } from '@mui/material';
import { DeleteForeverRounded, DeleteRounded, RemoveCircle, RemoveRounded, SaveAsRounded } from '@mui/icons-material';
import { Field, FieldArray, FormikValues, withFormik } from 'formik';
import * as yup from 'yup';
import React, { Fragment, useState } from 'react';

interface IIngredients {
  label: string;
  id: number;
}

interface IIngredientsWQuantity {
  label: string;
  id: number;
}
interface IRecetteForm {
  name: string;
  url: string;
  description: string;
  ingredients: IIngredients[];
  ingredientsWithQuantity: IIngredientsWQuantity[];
}

export const EditRecette = (): JSX.Element => {
  const { recetteId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://alsace-1bc06.kxcdn.com/img/ybc_blog/post/Choucroute_big.jpg';

  let isNewRecette = false;
  if (recetteId === 'new') {
    isNewRecette = true;
  }

  return (
    <div className='editItem'>
      <div className='image'>
        <span style={{ backgroundImage: 'url(' + defaultUrl + ')' }}></span>
      </div>

      <RecetteForm />
    </div>
  );
};

const JSXForm = (props: any): JSX.Element => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
  const listComplete: IIngredients[] = [
    { label: 'Interstellar', id: 2014 },
    { label: 'Shaun of the dead', id: 2004 },
    { label: 'Hot Fuzz', id: 2007 },
    { label: 'Le dernier pub avant la fin du monde', id: 2013 },
    { label: 'Thunder Tropics', id: 2008 },
    { label: 'Pulp Fiction', id: 1994 },
    { label: 'Snatch', id: 2000 },
    { label: 'Whiplash', id: 2014 },
    { label: '2001: A Space Odyssey', id: 1968 },
    { label: 'Inglourious Basterds', id: 2009 },
  ];
  const [ingredients, setIngredient] = useState<IIngredients[]>();

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <TextField
        label='Nom*'
        placeholder='Spätzle 🍝'
        type='text'
        name='name'
        value={values.name}
        variant='outlined'
        className='inputs'
        onChange={handleChange}
        helperText={touched.name ? errors.name : ''}
        error={touched.name && Boolean(errors.name)}
      />
      <TextField
        label='URL Image'
        placeholder='https://potee-egal-choucroute.de'
        type='text'
        name='url'
        value={values.url}
        variant='outlined'
        onChange={handleChange}
        helperText={touched.url ? errors.url : ''}
        error={touched.url && Boolean(errors.url)}
        className='inputs'
      />
      <TextField
        label='Description'
        placeholder='Qui a dit que le magret et la choucroute ça se mariait pas bien ? 🦆'
        name='description'
        value={values.description}
        variant='outlined'
        onChange={handleChange}
        helperText={touched.description ? errors.description : ''}
        error={touched.description && Boolean(errors.description)}
        className='inputs'
        rows={4}
        multiline
      />
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
          setIngredient(ingredients);
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
      <div className='ingredients'>
        <FieldArray name='ingredients'>
          {({ remove, push }) => (
            <Fragment>
              {(values.ingredients as IIngredients[])?.map((p, index) => {
                return (
                  <div className='ingredientForm'>
                    <Select
                      label='Ingredient'
                      className='ingredient'
                      name={`ingredients[${index}].ingredient`}
                      value={p.label}
                      variant='outlined'
                      onChange={handleChange}
                    >
                      {/*<MenuItem value=''></MenuItem>*/}
                      {listComplete.map(i => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <MenuItem value={i}>{i.label}</MenuItem>
                      ))}
                    </Select>
                    <TextField
                      label='Qte'
                      className='quantity'
                      name={`ingredients[${index}].quantity`}
                      value={p.label}
                      type='number'
                      InputProps={{ inputProps: { min: 1 } }}
                      variant='outlined'
                      onChange={handleChange}
                    />
                    <IconButton onClick={() => remove(index)} color='error'>
                      <DeleteRounded />
                    </IconButton>
                  </div>
                );
              })}
              <Button onClick={() => push({ quantity: 1 })} variant='outlined'>
                Ajouter
              </Button>
            </Fragment>
          )}
        </FieldArray>
        {JSON.stringify(values.ingredients)}
      </div>

      <div className='actions'>
        <Button variant='outlined' type='button' color='error' startIcon={<DeleteForeverRounded />}>
          Supprimer
        </Button>
        <Button variant='outlined' type='submit' color='primary' startIcon={<SaveAsRounded />}>
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

const RecetteForm = withFormik({
  mapPropsToValues: () => ({
    name: '',
    url: '',
    description: '',
    ingredients: [{ quantity: 1 }],
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .min(2, 'Pas assez de lettres 😬')
      .max(25, 'Trop de lettres 😡')
      .required('A remplir, banane ! 🍌'),
    url: yup
      .string()
      .url('Gruge pas, on veut un lien pas long !')
      .max(512, 'Trop long ton lien ! 😡')
      .required('Met une image stp 🖼️'),
    description: yup.string().max(256, 'Trop long ton fichu texte ! 😡').notRequired(),
    // ingredients: yup.array().min(2, "C'est pas une recette là!").required('Au moins 2 ingrédients !'),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  },
})(JSXForm);
