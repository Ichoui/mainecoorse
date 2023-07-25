import { Checkbox, FormControlLabel } from '@mui/material';
import { CoursesArticleList, ISnackbar } from '@shared-interfaces/items';
import { ChangeEvent, Fragment, useState } from 'react';
import './coches.scss';
import { ManageQuantity } from '@components/manage-quantity/manage-quantity';
import { RefetchFunction } from 'axios-hooks';
import { axiosUrl } from '@shared/hooks/axios.config';
import { useDebouncedCallback } from 'use-debounce';

export const Coches = (props: {
  item: CoursesArticleList;
  setSnackValues: ({ open, message, severity }: ISnackbar) => void;
  executePut: RefetchFunction<any, any>;
}) => {
  const { item, setSnackValues, executePut } = props;
  const [checked, setChecked] = useState(item.purchased);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    executePut({
      url: axiosUrl(`courses/purchased/${item.id}`),
      method: 'PUT',
      data: { purchased: event.target.checked },
    })
      .then(() => setSnackValues({ open: true, message: '🦊', severity: 'success', autoHideDuration: 500 }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 }));
  };

  const handleQuantity = useDebouncedCallback((quantity: number) => {
    console.log(quantity);

    executePut({
      url: axiosUrl(`courses/quantity/${item.id}`),
      method: 'PUT',
      data: { quantity },
    })
      .then(() => setSnackValues({ open: true, message: '🦆', severity: 'success', autoHideDuration: 500 }))
      .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 }));
  }, 250);

  return (
    <div className='Coches'>
      <FormControlLabel
        className={`label ${checked ? 'checked' : ''}`}
        control={<Checkbox onChange={handleCheck} checked={checked} />}
        label={
          <Fragment>
            <img src={item.url} alt={item.label} />
            <span>{item.label}</span>
          </Fragment>
        }
      />

      <div className={`quantity ${checked ? 'disabled' : ''}`}>
        <ManageQuantity itemQuantity={item.quantity} checked={checked} onChange={handleQuantity} />
      </div>
    </div>
  );
};
