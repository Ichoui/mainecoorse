import './editRecette.scss';
import '@styles/forms.scss';
import { Params, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, Button, Chip, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { DeleteForeverRounded, DeleteRounded, SaveAsRounded } from '@mui/icons-material';
import { FieldArray, withFormik } from 'formik';
import * as yup from 'yup';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ArticleList, ISnackbar, ItemBase, RecetteTags } from '@shared-interfaces/items';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import { configAxios } from '@shared/hooks/axios.config';
import { SnackbarContext } from '@app/app';
import { RefetchFunction } from 'axios-hooks';
import { urlTest } from '@shared/utils/url.utils';

export const EditRecette = (): JSX.Element => {
  const { recetteId }: Readonly<Params<string>> = useParams();
  const defaultUrl = 'https://alsace-1bc06.kxcdn.com/img/ybc_blog/post/Choucroute_big.jpg';
  const isNewRecette = recetteId === 'new';
  const item: ItemBase = useLocation().state;
  // const [bgi, setBgi] = useState({ url: defaultUrl, pending: true });
  const [bgi, setBgi] = useState<string>(defaultUrl);

  const { setSnackValues } = useContext(SnackbarContext);
  const navigation = useNavigate();

  // eslint-disable-next-line no-empty-pattern
  const [{}, removeRecette] = configAxios({ url: 'recettes', method: 'DELETE', manual: true });
  const [{ data }] = configAxios({ url: 'articles', method: 'GET', useCache: true });

  const [{ loading }, saveData] = configAxios({
    url: 'recettes',
    method: isNewRecette ? 'POST' : 'PUT',
    manual: true,
    params: { id: item?.id },
  });

  useEffect(() => {
    // urlTest(item?.url ?? '').then(res => setBgi({ url: res, pending: false }));
    urlTest(item?.url ?? '', defaultUrl).then(res => setBgi(res.url));
  }, [setBgi, item?.url]);

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, remove?: boolean) => {
    setOpenDialogConfirmation(open);
    if (remove) {
      removeRecette()
        .then(() => {
          setSnackValues({
            open: true,
            message: '👽 Recette supprimé',
            severity: 'success',
          });
          navigation('/recettes');
        })
        .catch(() => {
          setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error' });
        });
    }
  };
  return (
    <div className='editItem'>
      <div className='image'>
        <span style={{ backgroundImage: 'url(' + bgi + ')' }}></span>
      </div>

      <RecetteForm
        openDialogConfirmation={openDialogConfirmation}
        isNewRecette={isNewRecette}
        handleRemove={(open, remove) => handleDialogConfirmation(open, remove)}
        item={item}
        articlesData={data}
        navigation={navigation}
        setSnackValues={setSnackValues}
        saveData={saveData}
        loading={loading}
      />
    </div>
  );
};

const TSXForm = (props: any): JSX.Element => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    openDialogConfirmation,
    isNewRecette,
    handleRemove,
    articlesData,
    loading,
  } = props;
  // @ts-ignore
  const recettesTags = Object.values(RecetteTags);

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <TextField
        label='Nom*'
        placeholder='Spätzle 🍝'
        type='text'
        name='label'
        value={values.label}
        variant='outlined'
        className='inputs'
        onChange={handleChange}
        helperText={touched.label ? errors.label : ''}
        error={touched.label && Boolean(errors.label)}
      />
      <TextField
        label='Image Web*'
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
        label='Description*'
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
        limitTags={2}
        options={recettesTags}
        filterSelectedOptions={true}
        value={values.tags}
        renderTags={(tags: readonly RecetteTags[], getTagProps) => {
          return tags.map((option: RecetteTags, index: number) => (
            <Chip variant='outlined' label={option} {...getTagProps({ index })} />
          ));
        }}
        onChange={(e: object, tags: RecetteTags[]) => setFieldValue('tags', tags)}
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Tags*'
            error={touched.tags && Boolean(errors.tags)}
            helperText={touched.tags && errors.tags ? errors.tags : ''}
          />
        )}
      />

      <div className='articlesList'>
        <FieldArray name='articlesList'>
          {({ remove, push }) => (
            <Fragment>
              {(values.articlesList as ArticleList[])?.map((p, index) => {
                return (
                  <div key={index} className='articlesListForm'>
                    <TextField
                      select // because of outlined label does not display with <Select> tag ... bug
                      label='Article'
                      className='article'
                      name={`articlesList[${index}].label`}
                      value={p?.label ?? ''}
                      defaultValue={p?.label ?? ''}
                      variant='outlined'
                      helperText={
                        touched.articlesList && errors?.articlesList?.[index]?.label
                          ? errors?.articlesList[index].label
                          : ''
                      }
                      error={touched.articlesList && Boolean(errors?.articlesList?.[index]?.label)}
                    >
                      {articlesData?.map((art: ItemBase) => (
                        <MenuItem
                          key={`${art.id}-${index}`}
                          value={art.label}
                          onClick={() =>
                            setFieldValue(`articlesList[${index}]`, {
                              id: art.id,
                              label: art.label,
                              quantity: values.articlesList[index]?.quantity ?? 1, // On peut dissocier l'ajout d'un article et de la quantité :)
                            })
                          }
                        >
                          {art.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label='Qte'
                      className='quantity'
                      name={`articlesList[${index}].quantity`}
                      value={p.quantity}
                      type='number'
                      variant='outlined'
                      helperText={
                        touched.articlesList && errors?.articlesList?.[index]?.quantity
                          ? errors?.articlesList[index]?.quantity
                          : ''
                      }
                      error={touched.articlesList && Boolean(errors?.articlesList?.[index]?.quantity)}
                      onChange={handleChange}
                    />
                    <IconButton onClick={() => remove(index)} color='error'>
                      <DeleteRounded />
                    </IconButton>
                  </div>
                );
              })}
              <Button onClick={() => push({ quantity: '', label: '' })} variant='outlined'>
                Ajouter
              </Button>
              <Typography color='error'>
                {Boolean(errors.articlesList) && typeof errors.articlesList === 'string' ? errors.articlesList : ''}
              </Typography>
            </Fragment>
          )}
        </FieldArray>
      </div>

      <div className='actions'>
        {!isNewRecette && (
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
        <Button variant='outlined' type='submit' color='primary' disabled={loading} startIcon={<SaveAsRounded />}>
          Enregistrer
        </Button>
      </div>

      {/*OPEN DIALOG TO CONFIRM DELETE */}
      {openDialogConfirmation && (
        <DialogConfirmation
          open={openDialogConfirmation}
          isArticle={false}
          onClose={remove => handleRemove(false, remove)}
        />
      )}
    </form>
  );
};

const RecetteForm = withFormik({
  mapPropsToValues: (props: {
    openDialogConfirmation: boolean;
    isNewRecette: boolean;
    handleRemove: (open: boolean, remove?: boolean) => void;
    item: ItemBase;
    articlesData: ItemBase[];
    navigation: (to: string) => void;
    setSnackValues: ({ open, message, severity }: ISnackbar) => void;
    saveData: RefetchFunction<unknown, unknown>;
    loading: boolean;
  }) => ({
    label: props.item?.label,
    url: props.item?.url,
    description: props.item?.description,
    tags: props.item?.tags,
    articlesList: props.item?.articlesList ?? [{ label: '', quantity: '', id: null }],
  }),
  validationSchema: yup.object().shape({
    label: yup
      .string()
      .min(2, 'Pas assez de lettres 😬')
      .max(25, 'Trop de lettres 😡')
      .required('A remplir, banane ! 🍌'),
    url: yup
      .string()
      .url("C'est pas une vrai URL ça 🙀")
      .max(512, 'Trop long ton lien ! 😡')
      .required('Met une image stp 🖼️'),
    description: yup.string().max(256, 'Trop long ton fichu texte ! 😡').required('Encore un autographe svp 🖋️️'),
    articlesList: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          label: yup.string().required('Fait-un effort ! 🏋'),
          quantity: yup.number().min(1, '0 ? Nope !').required('0+0=😬'),
        }),
      )
      .min(2, 'Une recette avec un seul ingrédient... Voyons donc ! 🫠')
      .required('Au moins 2 ingrédients !'),
    tags: yup.array().min(1, 'NAMEHO ! Mets-en au moins 1 quoi ! 🧌').required('O-BLI-GA-TOIRE, OK ? 🤬'),
  }),
  handleSubmit: (values, formikBag) => {
    const { isNewRecette, navigation, setSnackValues, saveData } = formikBag.props;
    const valuesToSave = {
      ...values,
      articlesList: values.articlesList.map(art => ({ id: art.id, quantity: art.quantity })),
    };
    saveData({
      data: { ...valuesToSave },
    })
      .then(() => {
        setSnackValues({
          open: true,
          message: isNewRecette ? '🌞 Recette enregistrée' : '🌞 Recette modifiée',
          severity: 'success',
        });
        navigation('/recettes');
      })
      .catch(error => {
        setSnackValues({ open: true, error, severity: 'error' });
      });
  },
})(TSXForm);
