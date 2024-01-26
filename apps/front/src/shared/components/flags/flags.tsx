import Quebec from '/flags/qc.png';
import Occitan from '/flags/occitan.png';
import QcOccitan from '/flags/qcoccitan.png';
import React, { JSX, useState } from 'react';
import './flags.scss';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';
import { axiosUrl, configAxios } from '@shared/hooks/axios.config';
import { ISnackbar } from '@shared-interfaces/items';
import { EFlags } from '@shared-interfaces/flags';

export const Flags = (props: {
  setSnackValues: ({ open, message, severity }: ISnackbar) => void;
  settings: { strict: boolean; slug: string };
}): JSX.Element => {
  // eslint-disable-next-line prefer-const
  let { setSnackValues, settings } = props;
  settings = { strict: false, slug: EFlags.QCOCCITAN }; //tmp
  const flagList = [
    {
      slug: EFlags.QCOCCITAN,
      value: QcOccitan,
    },
    {
      slug: EFlags.OCCITAN,
      value: Occitan,
    },
    {
      slug: EFlags.QUEBEC,
      value: Quebec,
    },
  ];
  const [{ loading }, putData] = configAxios({
    manual: true,
    method: 'PUT',
    autoCancel: false,
  });
  const getFlag = (slug: string): { value: string; slug: EFlags } | undefined => flagList.find(f => f.slug === slug);
  const [draconien, setDraconien] = useState<boolean>(settings.strict);
  const [flag, setFlag] = useState<{ value: string; slug: EFlags } | undefined>(getFlag(settings.slug));

  const nextFlag = (slug: EFlags): void => {
    if (slug === EFlags.QCOCCITAN) {
      setFlag(flagList[1]);
    }
    if (slug === EFlags.OCCITAN) {
      setFlag(flagList[2]);
    }
    if (slug === EFlags.QUEBEC) {
      setFlag(flagList[0]);
    }

    handleFlag(slug);
  };

  const handleCheck = useDebouncedCallback((checked: boolean) => {
    setDraconien(checked);
    putData({
      url: axiosUrl(`settings/strict`),
      method: 'PUT',
      data: { strict: checked },
    })
      .then(() => setSnackValues({ open: true, message: '🦊', severity: 'success', autoHideDuration: 500 }))
      .catch(() => {
        setDraconien(!checked);
        setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 });
      });
  }, 250);

  const handleFlag = useDebouncedCallback((previousSlug: string) => {
    console.log(flag);
    putData({
      url: axiosUrl(`settings/flag`),
      method: 'PUT',
      data: { flag: flag!.slug },
    })
      .then(() => setSnackValues({ open: true, message: '🦊', severity: 'success', autoHideDuration: 500 }))
      .catch(() => {
        setFlag(getFlag(previousSlug));
        setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 });
      });
  }, 250);

  return (
    <div className='wrapper-flags'>
      <div className='flags' onClick={() => nextFlag(flag!.slug)}>
        <img src={flag!.value} alt={flag!.slug} />
      </div>
      <FormControlLabel
        control={<Checkbox color='secondary' onChange={event => handleCheck(event.target.checked)} />}
        label='🐲 Draconien'
        checked={draconien}
      />
    </div>
  );
};
