import './editArticle.scss';
import '@styles/forms.scss';
import { Params, useParams } from 'react-router-dom';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import { ArticleTags } from '@shared-interfaces/items';

export const EditArticle = (): JSX.Element => {
  const { articleId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://img.cuisineaz.com/660x660/2013/12/20/i47006-raclette.jpeg';
  const isNewArticle = articleId === 'new';

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, remove?: boolean) => {
    setOpenDialogConfirmation(open);
    if (remove) {
      // TODO Supprimer l'article
    }
  };

  return (
    <div className='editItem'>
      <div className='image'>
        <span style={{ backgroundImage: 'url(' + defaultUrl + ')' }}></span>
      </div>

      <ArticleForm
        openDialogConfirmation={openDialogConfirmation}
        isNewArticle={isNewArticle}
        handleRemove={(open, remove) => handleDialogConfirmation(open, remove)}
      />
    </div>
  );
};

const ArticleForm = (props: {
  openDialogConfirmation: boolean;
  values?: any;
  isNewArticle: boolean;
  handleRemove: (open: boolean, remove?: boolean) => void;
}): JSX.Element => {
  const { handleRemove, values, isNewArticle, openDialogConfirmation } = props;
  // @ts-ignore
  const articlesTags = Object.values(ArticleTags);

  const initialValues = {
    label: '',
    url: '',
    description: '',
    tags: [],
  };
  const validationSchema = yup.object().shape({
    label: yup
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
    tags: yup.array().min(1, 'Tu voulais des tags, tu les mets ! 🧌').required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => submit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <TextField
        label='Nom*'
        placeholder='Bethmale de vache 🧀'
        type='text'
        name='label'
        value={formik.values.label}
        variant='outlined'
        className='inputs'
        onChange={formik.handleChange}
        helperText={formik.touched.label ? formik.errors.label : ''}
        error={formik.touched.label && Boolean(formik.errors.label)}
      />

      <TextField
        label='URL Web*'
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
        label='Description*'
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
      <Autocomplete
        multiple
        className='inputs'
        size='small'
        limitTags={2}
        options={articlesTags}
        filterSelectedOptions={true}
        value={formik.values.tags}
        renderTags={(tags: readonly ArticleTags[], getTagProps) => {
          return tags.map((option: ArticleTags, index: number) => (
            <Chip variant='outlined' label={option} {...getTagProps({ index })} />
          ));
        }}
        onChange={(e: object, tags: ArticleTags[]) => formik.setFieldValue('tags', tags)}
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Tags*'
            error={formik.touched.tags && Boolean(formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags ? formik.errors.tags : ''}
          />
        )}
      />
      <div className='actions'>
        {!isNewArticle && (
          <Button
            variant='outlined'
            type='button'
            color='error'
            startIcon={<DeleteForeverRounded />}
            onClick={() => handleRemove(true)}
          >
            Supprimer
          </Button>
        )}
        <Button variant='outlined' type='submit' color='primary' startIcon={<SaveAsRounded />}>
          Enregistrer
        </Button>
      </div>

      {/*OPEN DIALOG TO CONFIRM DELETE */}
      {openDialogConfirmation && (
        <DialogConfirmation
          open={openDialogConfirmation}
          isArticle={true}
          onClose={remove => handleRemove(false, remove)}
        />
      )}
    </form>
  );
};

const submit = (values: FormikValues): void => {
  // TO SERVER !
  console.log(values);
};
