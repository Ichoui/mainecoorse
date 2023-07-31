import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import '../dialog.scss';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ManageQuantity } from '@components/manage-quantity/manage-quantity';
import { axiosUrl, configAxios } from '@shared/hooks/axios.config';
import { SnackbarContext } from '@app/app';

export const DialogAddCalendar = (props: {
  open: boolean;
  item: ItemBase;
  isArticle: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, item, onClose } = props;
  const [calendarCheck, setCalendarCheck] = useState(false);
  const [coursesCheck, setCoursesCheck] = useState(false);

  const formik = useFormik({
    initialValues: { multiple: 1, articles: item?.articlesList },
    validationSchema: yup.object().shape({
      articles: yup.array(),
      multiple: yup.number().min(1).required(),
    }),
    onSubmit: () => handleOk(),
  });
  const { setSnackValues } = useContext(SnackbarContext);

  const handleClose = () => {
    onClose();
  };

  const [{ loading: putLoading }, sendData] = configAxios({
    manual: true,
    method: 'PUT',
    autoCancel: false,
  });

  const handleCheckboxes = (checked: boolean, val: 'calendar' | 'courses') => {
    if (val === 'calendar') {
      setCalendarCheck(checked);
    }
    if (val === 'courses') {
      setCoursesCheck(checked);
    }
  };

  const handleOk = () => {
    const promiseArray = [];
    const upsert = (data: any, url: string, method = 'PUT') => sendData({ data: { ...data }, url, method });

    if (calendarCheck) {
      promiseArray.push(
        upsert({ itemId: item.id, type: isArticle ? ItemType.ARTICLE : ItemType.RECETTE, quantity: formik.values?.multiple }, axiosUrl('calendar/divers')),
      );
    }

    if (coursesCheck) {
      let articles = [];
      if (isArticle) {
        articles.push({ id: item.id, quantity: formik.values?.multiple });
      } else {
        articles = formik.values.articles!.map(val => ({ id: val.id, quantity: val.quantity }));
      }
      promiseArray.push(upsert({ articles }, axiosUrl('courses'), 'POST'));
    }

    Promise.all(promiseArray)
      .then(() => onClose())
      .then(() => setSnackValues({ open: true, message: '🎯', severity: 'success' }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error' }));
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='md'>
      <DialogTitle>Ajouter&nbsp;{isArticle ? 'cet article' : 'cette recette'}&nbsp;</DialogTitle>
      <DialogContent>
        <div className='dialog-content'>
          <div className='multiple'>
            <span>Ajouter combien de fois&nbsp;{isArticle ? "l'article" : 'la recette'}&nbsp;?</span>
            <ManageQuantity
              itemQuantity={formik.values.multiple}
              onChange={quantity => {
                formik.values.multiple = quantity;
                formik.values.articles?.map((a, i) =>
                  formik.setFieldValue(`articles[${i}]`, {
                    ...a,
                    quantity: item.articlesList![i].quantity * Number(quantity), // use item because it's base value
                  }),
                );
              }}
            />
          </div>
          <hr className='add-to' />
          <FormControlLabel
            className={calendarCheck ? 'checked' : ''}
            control={
              <Checkbox
                color='secondary'
                onChange={event => handleCheckboxes(Boolean(event.target.checked), 'calendar')}
                checked={calendarCheck}
              />
            }
            label='📆 Calendrier'
          />
          <FormControlLabel
            className={coursesCheck ? 'checked' : ''}
            control={
              <Checkbox
                color='secondary'
                onChange={event => handleCheckboxes(Boolean(event.target.checked), 'courses')}
                checked={coursesCheck}
              />
            }
            label='🛒 Liste de courses'
          />

          {!isArticle && coursesCheck && (
            <div className='form-ingredients-listing'>
              {item.articlesList?.map((article, i) => (
                <div key={i}>
                  <span>• {article.label}</span>
                  <TextField
                    label='Qte'
                    className='quantity'
                    size='small'
                    name={`articles[${i}]`}
                    value={formik.values.articles![i].quantity}
                    onChange={event =>
                      formik.setFieldValue(`articles[${i}]`, {
                        ...formik.values.articles![i],
                        quantity: Number(event.target.value),
                      })
                    }
                    type='number'
                    variant='outlined'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='button' onClick={handleClose} variant='outlined' color='primary'>
          Annuler
        </Button>
        <Button
          type='button'
          onClick={() => formik.handleSubmit()}
          variant='outlined'
          color='secondary'
          disabled={Boolean(formik.errors.multiple) || (!coursesCheck && !calendarCheck) || putLoading}
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
