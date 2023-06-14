import './editArticle.scss';
import { Params, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { Fragment } from 'react';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { Form, Formik, FormikHelpers, FormikValues, useFormikContext } from 'formik';
import * as yup from 'yup';

export const EditArticle = (): JSX.Element => {
  const { articleId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://img.cuisineaz.com/660x660/2013/12/20/i47006-raclette.jpeg';

  let isNewArticle = false;
  if (articleId === 'new') {
    isNewArticle = true;
  }
  return (
    <div className='editArticle'>
      <div className='image'>
        <span style={{ backgroundImage: 'url(' + defaultUrl + ')' }}></span>
      </div>
      <Fragment>{articleForm()}</Fragment>
    </div>
  );
};

const articleForm = (): JSX.Element => {
  const formValues = {
    name: '',
    url: '',
    description: '',
  };
  const validation = yup.object().shape({
    name: yup.string().min(3, 'The value is too short'),
  });
  return (
    <Formik
      initialValues={formValues}
      onSubmit={(values, action) => submit(values, action)}
      validationSchema={validation}
    >
      {({ errors, touched }) => (
        <Form>
          <TextField
            name='name'
            label='Nom'
            placeholder='Roquefort'
            type='text'
            variant='outlined'
            className='inputs'
            required
          />
          <TextField
            name='url'
            label='URL Image'
            placeholder='https://la-raclette-cest-la-vie.brie'
            type='text'
            variant='outlined'
            className='inputs'
          />
          <TextField
            name='description'
            label='Description'
            placeholder="Le Munster, c'est la vie... 🙃"
            variant='outlined'
            className='inputs'
            rows={4}
            multiline
          />
          <div className='actions'>
            <Button variant='outlined' type='button' color='error' startIcon={<DeleteForeverRounded />}>
              Supprimer
            </Button>
            <Button variant='outlined' type='submit' color='primary' startIcon={<SaveAsRounded />}>
              Enregistrer
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const submit = (values: FormikValues, action: FormikHelpers<any>): void => {
  console.log(values);
  console.log(action);
};
