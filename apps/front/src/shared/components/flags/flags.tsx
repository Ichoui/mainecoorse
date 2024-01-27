import Quebec from '/flags/qc.png';
import Occitan from '/flags/occitan.png';
import QcOccitan from '/flags/qcoccitan.png';
import React, { JSX, useState } from 'react';
import './flags.scss';
import { useDebouncedCallback } from 'use-debounce';
import { axiosUrl, configAxios } from '@shared/hooks/axios.config';
import { ISnackbar } from '@shared-interfaces/items';
import { EFlags } from '@shared-interfaces/flags';
import { Checkbox, FormControlLabel } from '@mui/material';

export const Flags = (props: {
  setSnackValues?: ({ open, message, severity }: ISnackbar) => void;
  settings: { flag: EFlags; strict?: boolean };
  onChange?: (flag: EFlags) => void;
}): JSX.Element => {
  // eslint-disable-next-line prefer-const
  let { setSnackValues, settings, onChange } = props;
  const flagList = [
    {
      slug: EFlags.QCOCCITAN,
      path: QcOccitan,
    },
    {
      slug: EFlags.OCCITAN,
      path: Occitan,
    },
    {
      slug: EFlags.QUEBEC,
      path: Quebec,
    },
  ];
  const [{ loading }, putData] = configAxios({
    manual: true,
    method: 'PUT',
    autoCancel: false,
  });
  const getFlagPath = (slug: string): { path: string; slug: EFlags } | undefined => flagList.find(f => f.slug === slug);
  const [flag, setFlag] = useState<{ path: string; slug: EFlags } | undefined>(getFlagPath(settings.flag));
  const [dracoonien, setDracoonien] = useState<boolean | undefined>(settings?.strict);

  const nextFlag = (previousSlug: EFlags): void => {
    Promise.resolve(previousSlug)
      .then(previous => {
        if (previous === EFlags.QCOCCITAN) {
          setFlag(flagList[1]);
          return flagList[1].slug;
        }
        if (previous === EFlags.OCCITAN) {
          setFlag(flagList[2]);
          return flagList[2].slug;
        }
        if (previous === EFlags.QUEBEC) {
          setFlag(flagList[0]);
          return flagList[0].slug;
        }
        return previous; // default
      })
      .then((newSlug: EFlags) => {
        // Si on utilise le composant pour envoyer un update en base
        if (setSnackValues) {
          handleFlag(previousSlug);
          localStorage.setItem('flag', newSlug);
        }

        if (onChange) {
          onChange(newSlug);
        }
      });
  };

  const handleCheck = useDebouncedCallback((checked: boolean) => {
    setDracoonien(checked);
    let message: string;
    if (checked) {
      if (flag!.slug === EFlags.QUEBEC) {
        message = '🐉⚜️ Produits strictement Québécois !';
      } else if (flag!.slug === EFlags.OCCITAN) {
        message = '🐉🏉 Produits strictement Toulousains !';
      }
    } else {
      message = '🐉 Dracoon désactivé !';
    }
    if (setSnackValues) {
      putData({
        url: axiosUrl(`settings/strict`),
        method: 'PUT',
        data: { strict: checked },
      })
        .then(() =>
          // @ts-ignore
          setSnackValues({
            open: true,
            message,
            severity: 'success',
            autoHideDuration: 1000,
          }),
        )
        .catch(() => {
          setDracoonien(!checked);
          // @ts-ignore
          setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 });
        });
    }
  }, 250);


  const handleFlag = useDebouncedCallback((previousSlug: string) => {
    let message: string;
    if (flag!.slug === EFlags.QUEBEC) {
      message = '⚜️ On va manger Québécois !';
    } else if (flag!.slug === EFlags.OCCITAN) {
      message = '🏉 On va manger Toulousain !';
    } else {
      message = '🏉⚜️ On va manger Toulouquébécois !';
    }
    putData({
      url: axiosUrl(`settings/flag`),
      method: 'PUT',
      data: { flag: flag!.slug },
    })
      // @ts-ignore
      .then(() => setSnackValues({ open: true, message, severity: 'success', autoHideDuration: 1000 }))
      .catch(() => {
        setFlag(getFlagPath(previousSlug));
        localStorage.setItem('flag', previousSlug);
        // @ts-ignore
        setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 });
      });
  }, 250);

  return (
    <div className='wrapper-flags'>
      <div className='flags' onClick={() => nextFlag(flag!.slug)}>
        <img src={flag!.path} alt={flag!.slug} />
      </div>
      {settings.strict !== undefined && (
        <FormControlLabel
          control={<Checkbox color='secondary' onChange={event => handleCheck(event.target.checked)} />}
          label='🐲 Dracoonien'
          checked={dracoonien}
          disabled={flag?.slug === EFlags.QCOCCITAN}
        />
      )}
    </div>
  );
};
