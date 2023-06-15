import './editRecette.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { FormikValues, withFormik } from 'formik';
import * as yup from 'yup';
import React from 'react';

interface IIngredients {
  label: string;
  id: number;
}
interface IRecetteForm {
  name: string;
  url: string;
  description: string;
  ingredient: IIngredients[];
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

      {/*{form?.ingredient?.map(e => {*/}
      {/*  console.log(e);*/}
      {/*  return e.id;*/}
      {/*})}*/}
    </div>
  );
};

const observer = v => {
  console.log(v);
};

const JSXForm = (props: any): JSX.Element => {
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = props;
  const listComplete = [
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
  return (
    <form onSubmit={handleSubmit} onChange={() => observer(values)}>
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
      <Autocomplete
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
        onChange={(e: object, ingredients: IIngredients[] | null) => setFieldValue('ingredients', ingredients)}
        renderInput={params => (
          <TextField
            {...params}
            helperText={touched.ingredients ? errors.ingredients : ''}
            error={touched.ingredients && Boolean(errors.ingredients)}
            variant='outlined'
            label='Ingrédients'
            placeholder='Allez les ingrédients !'
          />
        )}
      />

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
  mapPropsToValues: () => ({ name: '', url: '', description: '', ingredients: [] }),
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
    description: yup
      .string()
      .min(5, "Lol, t'appelles ça une description ?")
      .max(256, 'Trop long ton fichu texte ! 😡')
      .notRequired(),
    ingredients: yup.array().min(2, "C'est pas une recette là!").required('Au moins 2 ingrédients !'),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  },
})(JSXForm);
