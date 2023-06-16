import './dialog-inspect-item.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';

export const DialogInspectItem = (props: {
  open: boolean;
  isArticle: boolean;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, isArticle, onClose } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} maxWidth='xs'>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText>ON REGARDE L'ITEM ICI</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant='outlined' color='primary'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
