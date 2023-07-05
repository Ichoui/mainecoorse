import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ArticleList, ItemBase } from '@shared-interfaces/items';
import '../dialog.scss';
import { useDebouncedCallback } from 'use-debounce';

import * as yup from 'yup';
import { useFormik } from 'formik';

export const DialogAddCalendar = (props: {
  open: boolean;
  item: ItemBase;
  isArticle: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, item, onClose } = props;
  const [radio, setRadio] = useState('courses');
  const handleRadio = (event: ChangeEvent<HTMLInputElement>) => {
    setRadio((event.target as HTMLInputElement).value);
  };

  const [updatedItem, setUpdatedItem] = useState(item);
  const handleClose = () => {
    onClose();
  };

  const handleChangeQuantity = useDebouncedCallback((quantity: number, article: ArticleList) => {
    article = { ...article, quantity };
    // Updated articleList
    const articlesList: ArticleList[] = updatedItem.articlesList!.map(al => (al.id === article.id ? article : al));
    setUpdatedItem({ ...updatedItem, articlesList });
  }, 250);

  const handleOk = () => {
    console.log(updatedItem);
    // Envoyer vers courses seulement l'item updaté (ou non)
    if (radio === 'courses') {
    }

    // Envoyer vers courses l'item + quantité et envoyer vers calendar l'article ou la recette
    if (radio === 'calendar') {
    }

    onClose();
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='md'>
      <DialogTitle>Ajouter&nbsp;{isArticle ? 'cet article' : 'cette recette'}&nbsp;</DialogTitle>
      <DialogContent>
        <div className='dialog-content'>
          <RadioGroup value={radio} onChange={handleRadio}>
            <FormControlLabel value='courses' control={<Radio />} label='🛒 Liste de courses' />
            <FormControlLabel value='calendar' control={<Radio />} label='📆 Calendrier' />
          </RadioGroup>

          {!isArticle && (
            <div className='form-ingredients-listing'>
              {item.articlesList?.map((article, i) => (
                <div key={i}>
                  <span>{article.label}</span>
                  <TextField
                    label='Qte'
                    className='quantity'
                    size='small'
                    defaultValue={article.quantity}
                    type='number'
                    variant='outlined'
                    onChange={event => handleChangeQuantity(Number(event.target.value), article)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant='outlined' color='primary'>
          Annuler
        </Button>
        <Button onClick={handleOk} variant='outlined' color='secondary'>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
};
