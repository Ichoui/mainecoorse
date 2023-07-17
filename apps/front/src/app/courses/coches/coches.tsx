import { Checkbox, FormControlLabel } from '@mui/material';
import { ArticleList } from '@shared-interfaces/items';
import { ChangeEvent, useState } from 'react';
import './coches.scss';
import { ManageQuantity } from '@components/manage-quantity/manage-quantity';

export const Coches = (props: { item: ArticleList }) => {
  const { item } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    // TODO API update la valeur (ou remonter la valeur je ne sais pas encore)
  };

  return (
    <div className='Coches'>
      <FormControlLabel
        className={checked ? 'checked' : ''}
        control={<Checkbox onChange={handleChange} checked={checked} />}
        label={item.label}
      />

      <div className={`quantity ${checked ? 'disabled' : ''}`}>
        <ManageQuantity itemQuantity={item.quantity} checked={checked} />
      </div>
    </div>
  );
};
