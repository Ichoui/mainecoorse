import { Alert, Snackbar, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { ISnackbar } from '@shared-interfaces/items';

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
  let autoHideDuration = 2000;

  if (snackValues.error) {
    autoHideDuration = 4000;
    message =
      snackValues.error?.response?.status !== 500 ? `🛑 ${snackValues!.error!.response.data.message}` : '😨 Erreur !';
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
