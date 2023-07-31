import '../dialog.scss';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ItemBase } from '@shared-interfaces/items';
import React, { useEffect, useState } from 'react';
import { urlTest } from '@shared/utils/url.utils';
import { LoaderThree } from '@shared/svg/loader-three';

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

  const [itemUrl, setItemUrl] = useState({ url: '', pending: true, typeUrl: '' });
  useEffect(() => {
    urlTest(item?.url ?? '').then(res => setItemUrl({ url: res.url, pending: false, typeUrl: res.typeUrl }));
  }, [item?.url, setItemUrl]);

  return (
    <Dialog open={open} keepMounted TransitionComponent={DialogTransitionUp} fullWidth>
      <DialogTitle>{item.label}</DialogTitle>
      <DialogContent>
        <div className='dialog-content'>
          {itemUrl?.pending && (
            <div className='isLoadingImage'>
              <LoaderThree />
            </div>
          )}
          {!itemUrl?.pending && <img src={itemUrl?.url} alt={item.label} className={itemUrl?.typeUrl} />}
          <p>{item.description}</p>
          {item?.tags && (
            <div className='tags'>
              {item.tags?.map((tag, i) => (
                <Chip key={i} label={tag} variant='outlined' />
              ))}
            </div>
          )}

          {!isArticle && (
            <div className='ingredients-listing'>
              {item.articlesList?.map((art, i) => (
                <p key={i}>
                  {art.quantity} {art.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant='outlined' color='primary'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
