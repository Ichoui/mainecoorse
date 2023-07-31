import { Alert, Snackbar, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ISnackbar } from '@shared-interfaces/items';
import { HttpStatus } from '@nestjs/common';

export const SnackbarPortal = (props: { snackValues: ISnackbar; closeSnackbar: () => void }): JSX.Element => {
  const { snackValues } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  let message = null;
  let autoHideDuration = 1750;

  if (snackValues.error) {
    autoHideDuration = 3000;

    if (snackValues.error?.response?.status === HttpStatus.I_AM_A_TEAPOT) {
      snackValues.severity = 'warning'
      message = `🤡 ${snackValues!.error!.response.data.warning}`;
    } else if (snackValues.error?.response?.status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      message = `🛑 ${snackValues!.error!.response.data.message}`;
    } else {
      message = '😨 Erreur !';
    }

  }
  useEffect(() => {
    setOpen(snackValues.open);
  }, [snackValues]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={snackValues.autoHideDuration ?? autoHideDuration}
    >
      <Alert onClose={handleClose} variant='filled' severity={snackValues.severity} sx={{ width: 'auto' }}>
        <Typography fontFamily={'Oswald-medium'}>{snackValues?.message ?? message}</Typography>
      </Alert>
    </Snackbar>
  );
};
