import './editRecette.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';

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

      {RecetteForm()}
    </div>
  );
};

const RecetteForm = (values?: any): JSX.Element => {
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
      .min(5, "Lol, t'appelles ça une description ?")
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
        placeholder='Spätzle 🍝'
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
        placeholder='https://potee-egal-choucroute.de'
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
        placeholder='Qui a dit que le magret et la choucroute ça se mariait pas bien ? 🦆'
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
