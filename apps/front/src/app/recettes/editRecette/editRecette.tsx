import './editRecette.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DeleteForeverRounded, DeleteRounded, SaveAsRounded } from '@mui/icons-material';
import { ErrorMessage, FieldArray, withFormik } from 'formik';
import * as yup from 'yup';
import React, { Fragment, useState } from 'react';
import { getIn } from 'yup';

interface IIngredientsWithQte {
  ingredient: IIngredient;
  quantity?: number;
}

interface IIngredient {
  label: string;
  id: number;
}

interface IRecetteForm {
  name: string;
  url: string;
  description: string;
  ingredients: IIngredientsWithQte[];
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
  const listComplete: IIngredient[] = [
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

      <div className='ingredients'>
        <FieldArray name='ingredients'>
          {({ remove, push }) => (
            <Fragment>
              {(values.ingredients as IIngredientsWithQte[])?.map((p, index) => {
                return (
                  <div key={index} className='ingredientForm'>
                    <TextField
                      select // because of outlined label does not display with <Select> tag ... bug
                      label='Ingredient'
                      className='ingredient'
                      name={`ingredients[${index}].ingredient`}
                      value={p?.ingredient?.label ?? ''}
                      defaultValue={p?.ingredient?.label ?? ''}
                      variant='outlined'
                      helperText={
                        touched.ingredients && errors?.ingredients?.[index]?.ingredient
                          ? errors?.ingredients[index]?.ingredient
                          : ''
                      }
                      error={touched.ingredients && Boolean(errors?.ingredients?.[index]?.ingredient)}
                    >
                      {listComplete.map(ing => (
                        <MenuItem
                          key={`${ing.label}-${index}`}
                          value={ing.label}
                          onClick={() => setFieldValue(`ingredients[${index}].ingredient`, ing)}
                        >
                          {ing.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label='Qte'
                      className='quantity'
                      name={`ingredients[${index}].quantity`}
                      value={p.quantity}
                      type='number'
                      variant='outlined'
                      helperText={
                        touched.ingredients && errors?.ingredients?.[index]?.quantity
                          ? errors?.ingredients[index]?.quantity
                          : ''
                      }
                      error={touched.ingredients && Boolean(errors?.ingredients?.[index]?.quantity)}
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
              <Typography color='error'>
                {Boolean(errors.ingredients) && typeof errors.ingredients === 'string' ? errors.ingredients : ''}
              </Typography>
            </Fragment>
          )}
        </FieldArray>
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
    name: 'aee',
    url: 'http://localhost.com',
    description: 'test',
    ingredients: [
      { quantity: 5, ingredient: { label: 'Thunder Tropics', id: 2008 } },
      { quantity: 7, ingredient: { label: '2001: A Space Odyssey', id: 1968 } },
      { quantity: 9, ingredient: { label: 'Shaun of the dead', id: 2004 } },
    ],
  }),
  validationSchema: yup.object().shape({
    name: yup
      .string()
      .min(2, 'Pas assez de lettres 😬')
      .max(25, 'Trop de lettres 😡')
      .required('A remplir, banane ! 🍌'),
    url: yup
      .string()
      .url("C'est pas une vrai URL ça")
      .max(512, 'Trop long ton lien ! 😡')
      .required('Met une image stp 🖼️'),
    description: yup.string().max(256, 'Trop long ton fichu texte ! 😡').notRequired(),
    ingredients: yup
      .array()
      .of(
        yup.object().shape({
          ingredient: yup.object().required('Ne pas zapper !'),
          quantity: yup.number().min(1, '0 ? Nope !'),
        }),
      )
      .min(2, 'Une recette sans ingrédients... Voyons donc ! 🫠')
      .required('Au moins 2 ingrédients !'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  },
})(JSXForm);