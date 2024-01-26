import '../dialog.scss';
import { Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from '@mui/material';
import { DialogTransitionUp } from '@components/dialogs/dialog';
import { ItemBase } from '@shared-interfaces/items';
import React, { useEffect, useState } from 'react';
import { urlTest } from '@shared/utils/url.utils';
import { LoaderThree } from '@shared/svg/loader-three';
import { OpenInNewRounded } from '@mui/icons-material';
import disapproved from '/disapproved.png';
import approved from '/approved.png';
import { isBoolean } from 'class-validator';
import occitan from '/flags/croix-occitane.png';
import lys from '/flags/fleur-de-lys.png';
import { EFlags } from '@shared-interfaces/flags';

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
          {!itemUrl?.pending && (
            <div className='image'>
              {item?.approved && (
                <div className='approbation approved'>
                  <img src={approved} alt='Maple approves' />
                </div>
              )}
              {isBoolean(item.approved) && !item.approved && (
                <div className='approbation disapproved'>
                  <img src={disapproved} alt='Maple disapproves' />
                </div>
              )}
              <img src={itemUrl?.url} alt={item.label} className={itemUrl?.typeUrl} />
            </div>
          )}

          {item?.tags && (
            <div className='tags'>
              {(item?.flag === EFlags.QCOCCITAN || item?.flag === EFlags.QUEBEC) && (
                <Avatar src={lys} sx={{ width: 24, height: 24 }}></Avatar>
              )}
              {(item?.flag === EFlags.QCOCCITAN || item?.flag === EFlags.OCCITAN) && (
                <Avatar src={occitan} sx={{ width: 24, height: 24 }}></Avatar>
              )}
              {item.tags?.map((tag, i) => <Chip key={i} label={tag} variant='outlined' />)}
            </div>
          )}

          {!isArticle && item?.link && (
            <div className='link'>
              <Fab size='small' color='primary' aria-label='open in browser' href={item.link} target='_blank'>
                <OpenInNewRounded />
              </Fab>
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
