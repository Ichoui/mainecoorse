import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';

export const DialogConfirmation = (props: {
  open: boolean;
  isArticle: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, onClose } = props;
  const handleClose = () => {
    onClose();
  };
  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='xs'>
      <DialogTitle>Supprimer&nbsp;{isArticle ? "l'article" : 'la recette'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          🚧 ATTENTION 🚨 !<br />
          Si tu supprimes, ça ne reviendra pas...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant='outlined' color='primary'>
          Refuser
        </Button>
        <Button onClick={handleOk} variant='outlined' color='error'>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
