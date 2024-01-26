import Quebec from '/flags/qc.png';
import Occitan from '/flags/occitan.png';
import QcOccitan from '/flags/qcoccitan.png';
import React, { JSX, useState } from 'react';
import './flags.scss';
import { useDebouncedCallback } from 'use-debounce';
import { axiosUrl, configAxios } from '@shared/hooks/axios.config';
import { ISnackbar } from '@shared-interfaces/items';
import { EFlags } from '@shared-interfaces/flags';

export const Flags = (props: {
  setSnackValues: ({ open, message, severity }: ISnackbar) => void;
  settings: { strict: boolean; flag: string };
}): JSX.Element => {
  // eslint-disable-next-line prefer-const
  let { setSnackValues, settings } = props;
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
  const [flag, setFlag] = useState<{ value: string; slug: EFlags } | undefined>(getFlag(settings.flag));

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
      .then(() => setSnackValues({ open: true, message, severity: 'success', autoHideDuration: 1000 }))
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
    </div>
  );
};
