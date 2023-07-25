import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';

export const DialogConfirmation = (props: {
  open: boolean;
  isArticle?: boolean;
  purge?: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, purge = false, onClose } = props;
  const handleClose = () => {
    onClose();
  };
  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='xs'>
      <DialogTitle>
        {typeof isArticle !== 'undefined' && <div>Supprimer&nbsp;{isArticle ? "l'article" : 'la recette'}</div>}
        {purge && <div>C'est l'heure de la Purge...</div>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span>
            🚧 ATTENTION 🚨 !<br />
            Si tu supprimes, ça ne reviendra pas...
          </span>
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
