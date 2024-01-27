import '@styles/forms.scss';
import { Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import { ArticleTags, ISnackbar, ItemBase } from '@shared-interfaces/items';
import { configAxios } from '@shared/hooks/axios.config';
import { RefetchFunction } from 'axios-hooks';
import { SnackbarContext } from '@app/app';
import { urlTest } from '@shared/utils/url.utils';
import { LoaderThree } from '@shared/svg/loader-three';
import { EFlags } from '@shared-interfaces/flags';
import { Flags } from '@/shared/components/flags/flags';
import { useDebouncedCallback } from 'use-debounce';

export const EditArticle = (): JSX.Element => {
  const { articleId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://img.cuisineaz.com/660x660/2013/12/20/i47006-raclette.jpeg';
  const isNewArticle = articleId === 'new';
  const item: ItemBase = useLocation().state;
  const [bgi, setBgi] = useState<string>(item?.url ?? defaultUrl);
  const { setSnackValues } = useContext(SnackbarContext);
  const navigation = useNavigate();
  const [backgroundSize, setBackgroundSize] = useState<string>('contain'); // add state for background size

  useEffect(() => {
    urlTest(item?.url ?? '', defaultUrl).then(res => {
      setBgi(res.url);
      const image = new Image();
      image.onload = function (e) {
        // @ts-ignore
        if (this.width === this.height) {
          setBackgroundSize('contain');
        } else {
          setBackgroundSize('cover');
        }
      };
      image.src = res.url;
    });
  }, [item?.url]);

  // eslint-disable-next-line no-empty-pattern
  const [{}, removeArticle] = configAxios({
    url: 'articles',
    method: 'DELETE',
    manual: true,
    params: { id: item?.id },
  });

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, remove?: boolean) => {
    setOpenDialogConfirmation(open);
    if (remove) {
      removeArticle()
        .then(() => {
          setSnackValues({
            open: true,
            message: '👽 Article supprimé',
            severity: 'success',
          });
          navigation('/articles');
        })
        .catch(error => {
          setSnackValues({ open: true, error, severity: 'error' });
        });
    }
  };

  return (
    <div className='editItem'>
      <div className='image'>
        <span style={{ backgroundSize, backgroundImage: 'url(' + bgi + ')' }}></span>
      </div>
      <ArticleForm
        openDialogConfirmation={openDialogConfirmation}
        isNewArticle={isNewArticle}
        handleRemove={(open, remove) => handleDialogConfirmation(open, remove)}
        item={item}
        navigation={navigation}
        setSnackValues={setSnackValues}
      />
    </div>
  );
};

const ArticleForm = (props: {
  openDialogConfirmation: boolean;
  isNewArticle: boolean;
  handleRemove: (open: boolean, remove?: boolean) => void;
  item: ItemBase;
  navigation: (to: string) => void;
  setSnackValues: ({ open, message, severity }: ISnackbar) => void;
}): JSX.Element => {
  const { handleRemove, isNewArticle, openDialogConfirmation, item, navigation, setSnackValues } = props;
  const [{ loading }, saveData] = configAxios({
    url: 'articles',
    method: isNewArticle ? 'POST' : 'PUT',
    manual: true,
    params: { id: item?.id },
  });

  // @ts-ignore
  const articlesTags = Object.values(ArticleTags);

  const imageWebInputRef = useRef<HTMLDivElement>(null);
  const [previewSize, setPreviewSize] = useState<number>(0);
  const [previewImg, setPreviewImg] = useState({ url: '', pending: false });

  const initialValues: Partial<ItemBase> = {
    label: item?.label,
    url: item?.url,
    description: item?.description,
    flag: item?.flag || localStorage.getItem('flag') as EFlags || EFlags.QCOCCITAN,
    tags: item?.tags,
  };
  const validationSchema = yup.object().shape({
    label: yup
      .string()
      .min(2, 'Pas assez de lettres 😬')
      .max(40, 'Trop de lettres 😡')
      .required('A remplir, banane ! 🍌'),
    url: yup
      .string()
      .url('Gruge pas, on veut un lien pas long !')
      .max(512, 'Trop long ton lien ! 😡')
      .required('Met une image stp 🖼️'),
    description: yup.string().max(1024, 'Trop long ton fichu texte ! 😡').required('Un autographe svp 🖋️'),
    tags: yup.array().min(1, 'Tu voulais des tags, tu les mets ! 🧌').required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => submit(values, saveData, navigation, setSnackValues, isNewArticle),
  });

  useEffect(() => {
    setPreviewSize(imageWebInputRef.current?.offsetHeight ?? 50);
    initializeUrlTest(item?.url);
  }, []);

  const initializeUrlTest = useDebouncedCallback((val: string): void => {
    setPreviewImg({ url: val, pending: true });
    urlTest(val ?? '', undefined, true).then(res => setPreviewImg({ url: res.url, pending: false }));
  }, 250);

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
      <div className='image-web'>
        <TextField
          label='Image Web*'
          placeholder='https://munster-alsace.de'
          type='text'
          name='url'
          size='small'
          value={formik.values.url}
          variant='outlined'
          onChange={event => {
            initializeUrlTest(event.target.value);
            return formik.handleChange(event);
          }}
          helperText={formik.touched.url ? formik.errors.url : ''}
          error={formik.touched.url && Boolean(formik.errors.url)}
          className='inputs'
          ref={imageWebInputRef}
        />
        {!previewImg?.pending && (
          <img src={previewImg.url} alt='' style={{ height: previewSize + 'px', width: previewSize + 'px' }} />
        )}
        {previewImg?.pending && <LoaderThree />}
      </div>
      <Autocomplete
        multiple
        className='inputs'
        size='small'
        limitTags={2}
        options={articlesTags}
        filterSelectedOptions={true}
        value={formik.values.tags as ArticleTags[]}
        renderTags={(tags, getTagProps) => {
          return tags.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />);
        }}
        onChange={(e, tags) => formik.setFieldValue('tags', tags)}
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

      <Flags
        settings={{ flag: formik.values.flag || EFlags.QCOCCITAN }}
        onChange={flag => {
          formik.setFieldValue('flag', flag);
        }}
      ></Flags>

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
        minRows={3}
        multiline
      />

      <div className='actions'>
        {!isNewArticle && (
          <Button
            variant='outlined'
            type='button'
            color='error'
            startIcon={<DeleteForeverRounded />}
            disabled={loading}
            onClick={() => handleRemove(true)}
          >
            Supprimer
          </Button>
        )}
        <Button variant='outlined' type='submit' color='primary' startIcon={<SaveAsRounded />} disabled={loading}>
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

const submit = (
  values: FormikValues,
  saveData: RefetchFunction<unknown, unknown>,
  navigation: (to: string) => void,
  setSnackValues: ({ open, message, severity }: ISnackbar) => void,
  isNewArticle: boolean,
): void => {
  saveData({
    data: { ...values },
  })
    .then(() => {
      setSnackValues({
        open: true,
        message: isNewArticle ? '🌞 Article enregistré' : '🌞 Article modifié',
        severity: 'success',
      });
      navigation('/articles');
    })
    .catch(error => setSnackValues({ open: true, error, severity: 'error' }));
};
