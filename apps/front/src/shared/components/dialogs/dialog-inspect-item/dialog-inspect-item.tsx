import '../dialog.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ItemBase } from '@shared-interfaces/items';

export const DialogInspectItem = (props: {
  open: boolean;
  isArticle: boolean;
  item: ItemBase;
  onClose: (confirm?: boolean) => void;
}): JSX.Element => {
  const { open, onClose, isArticle, item } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} fullWidth>
      <DialogTitle>{item.label}</DialogTitle>
      <DialogContent>
        <DialogContentText className='dialog-content'>
          <img src={item.webImage} alt={item.label} />
          <div>{item.description}</div>
          {!isArticle && <div>liste ingredient</div>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant='outlined' color='primary'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
