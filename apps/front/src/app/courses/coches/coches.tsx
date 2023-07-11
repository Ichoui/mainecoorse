import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { ArticleList } from '@shared-interfaces/items';
import { ChangeEvent, useState } from 'react';
import './coches.scss';
import { AddRounded, RemoveRounded } from '@mui/icons-material';

export const Coches = (props: { item: ArticleList }) => {
  const { item } = props;
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    // TODO API update la valeur (ou remonter la valeur je ne sais pas encore)
  };
  const handleQuantity = (add: boolean) => {
    if (!checked) {
      setQuantity(add ? quantity + 1 : quantity - 1);
    }
  };

  return (
    <div className='Coches'>
      <FormControlLabel
        className={checked ? 'checked' : ''}
        control={<Checkbox onChange={handleChange} checked={checked} />}
        label={item.label}
      />

      <div className={`quantity ${checked ? 'disabled' : ''}`}>
        <div className='value'>{quantity}</div>
        <IconButton className="add" color='secondary' onClick={() => handleQuantity(true)}>
          <AddRounded />
        </IconButton>

        <IconButton className="remove" color='error' onClick={() => handleQuantity(false)}>
          <RemoveRounded />
        </IconButton>
      </div>
    </div>
  );
};
