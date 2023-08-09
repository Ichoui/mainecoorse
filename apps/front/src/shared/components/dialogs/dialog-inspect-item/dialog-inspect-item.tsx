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
          {item?.tags && (
            <div className='tags'>
              {item.tags?.map((tag, i) => (
                <Chip key={i} label={tag} variant='outlined' />
              ))}
            </div>
          )}

          {!isArticle && (
            <div className='ingredients'>
              <strong>Ingrédients</strong>
              <br />
              {item.articlesList?.map((art, i) => (
                <p key={i}>
                  <img src={art.url} alt='' /> {art.quantity} {art.label}
                </p>
              ))}
            </div>
          )}

          {item?.complements && (
            <p className='complements'>
              <strong>Le petit +</strong>
              <br />
              {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
              <span dangerouslySetInnerHTML={{ __html: `${item.complements}` }} />
            </p>
          )}

          <p
            className='description'
            dangerouslySetInnerHTML={{ __html: `<strong>Description</strong><br/> ${item.description}` }}
          />
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
