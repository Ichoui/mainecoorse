import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ItemBase } from '@shared-interfaces/items';

export const DialogAddCalendar = (props: {
  open: boolean;
  item: ItemBase;
  isArticle: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, item, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  const handleOk = () => {
    console.log(item);
    onClose();
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='xs'>
      <DialogTitle>Que fait-on avec&nbsp;{isArticle ? 'cet article ?' : 'cette recette ?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Choix 1 Choix 2{/*{item?.articlesList.map(e => )}*/}</DialogContentText>
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
