import { Checkbox, FormControlLabel } from '@mui/material';
import { CoursesArticleList, ISnackbar } from '@shared-interfaces/items';
import { Fragment, useEffect, useState } from 'react';
import './coches.scss';
import { ManageQuantity } from '@components/manage-quantity/manage-quantity';
import { RefetchFunction } from 'axios-hooks';
import { axiosUrl } from '@shared/hooks/axios.config';
import { useDebouncedCallback } from 'use-debounce';
import Maple from '/maple.png';

export const Coches = (props: {
  item: CoursesArticleList;
  setSnackValues: ({ open, message, severity }: ISnackbar) => void;
  executePut: RefetchFunction<any, any>;
  cocheChanged: () => void
}) => {
  const { item, setSnackValues, executePut, cocheChanged } = props;
  const [checked, setChecked] = useState(item.purchased);

  const handleCheck = useDebouncedCallback((checked: boolean) => {
    executePut({
      url: axiosUrl(`courses/purchased/${item.id}`),
      method: 'PUT',
      data: { purchased: checked },
    })
      .then(() => cocheChanged())
      .then(() => setSnackValues({ open: true, message: '🦊', severity: 'success', autoHideDuration: 500 }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 }));
  }, 250);

  const handleQuantity = useDebouncedCallback((quantity: number) => {
    executePut({
      url: axiosUrl(`courses/quantity/${item.id}`),
      method: 'PUT',
      data: { quantity },
    })
      .then(() => cocheChanged())
      .then(() => setSnackValues({ open: true, message: '🦆', severity: 'success', autoHideDuration: 500 }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 }));
  }, 250);

  useEffect(() => {
    setChecked(item.purchased);
  }, [item]);

  const [icon, setIcon] = useState<string>('');
  useEffect(() => {
    setIcon(item?.url ?? Maple)
  }, [setIcon, item?.url]);

  return (
    <div className='Coches'>
      <FormControlLabel
        className={`label ${checked ? 'checked' : ''}`}
        control={
          <Checkbox
            onChange={e => {
              setChecked(e.target.checked); // Ici pour permettre au débounce et à la requête de se faire indépendamment de l'affichage
              return handleCheck(e.target.checked);
            }}
            checked={checked}
          />
        }
        label={
          <Fragment>
            <img src={icon} alt={item.label} />
            <span>{item.label}</span>
          </Fragment>
        }
      />

      <div className={`quantity ${checked ? 'disabled' : ''}`}>
        <ManageQuantity itemQuantity={item.quantity} stepUp={0.5} checked={checked} onChange={handleQuantity} />
      </div>
    </div>
  );
};
