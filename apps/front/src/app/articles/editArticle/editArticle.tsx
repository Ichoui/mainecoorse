import './editArticle.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';

export const EditArticle = (): JSX.Element => {
  const { articleId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://img.cuisineaz.com/660x660/2013/12/20/i47006-raclette.jpeg';

  let isNewArticle = false;
  if (articleId === 'new') {
    isNewArticle = true;
  }

  return (
    <div className='editItem'>
      <div className='image'>
        <span style={{ backgroundImage: 'url(' + defaultUrl + ')' }}></span>
      </div>

      <ArticleForm/>
    </div>
  );
};

const ArticleForm = (values?: any): JSX.Element => {
  const initialValues = {
    name: '',
    url: '',
    description: '',
  };
  const validationSchema = yup.object().shape({
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
      .max(256, 'Trop long ton fichu texte ! 😡')
      .notRequired(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => submit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label='Nom*'
        placeholder='Bethmale de vache 🧀'
        type='text'
        name='name'
        value={formik.values.name}
        variant='outlined'
        className='inputs'
        onChange={formik.handleChange}
        helperText={formik.touched.name ? formik.errors.name : ''}
        error={formik.touched.name && Boolean(formik.errors.name)}
      />

      <TextField
        label='URL Image'
        placeholder='https://munster-alsace.de'
        type='text'
        name='url'
        value={formik.values.url}
        variant='outlined'
        onChange={formik.handleChange}
        helperText={formik.touched.url ? formik.errors.url : ''}
        error={formik.touched.url && Boolean(formik.errors.url)}
        className='inputs'
      />
      <TextField
        label='Description'
        placeholder='On se fait une petite Raclette, une Tartiflette ou une Fondue ? 🫕'
        name='description'
        value={formik.values.description}
        variant='outlined'
        onChange={formik.handleChange}
        helperText={formik.touched.description ? formik.errors.description : ''}
        error={formik.touched.description && Boolean(formik.errors.description)}
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
    </form>
  );
};

const submit = (values: FormikValues): void => {
  // TO SERVER !
  console.log(values);
};
