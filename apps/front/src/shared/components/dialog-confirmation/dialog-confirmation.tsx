import './dialog-confirmation.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';

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
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  return (
    <Dialog open={open} keepMounted TransitionComponent={Transition} maxWidth='xs'>
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
