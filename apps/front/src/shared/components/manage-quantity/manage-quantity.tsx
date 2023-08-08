import { IconButton } from '@mui/material';
import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { useState } from 'react';
import './manage-quantity.scss';

export const ManageQuantity = (props: {
  itemQuantity: number;
  checked?: boolean;
  onChange?: (quantity: number) => void;
  stepUp?: number;
}) => {
  const { itemQuantity, checked, onChange, stepUp = 1 } = props;
  const [quantity, setQuantity] = useState(itemQuantity);

  const handleQuantity = (add: boolean) => {
    if (!checked) {
      let newQuantity = quantity;

      if (!add && quantity - stepUp <= 0) {
        // On bloque le fait de pouvoir descendre à 0, car il faut au minimum la valeur du Step (1 ou 0.5 la plupart des cas)
        return;
      }
      newQuantity = add ? quantity + stepUp : quantity - stepUp;
      setQuantity(Number(newQuantity.toFixed(2)));

      if (onChange) {
        onChange(Number(newQuantity.toFixed(2)));
      }
    }
  };

  return (
    <div className='Quantity'>
      <div className='value'>{quantity}</div>
      <IconButton className='add' color='secondary' onClick={() => handleQuantity(true)}>
        <AddRounded />
      </IconButton>

      <IconButton className='remove' color='error' onClick={() => handleQuantity(false)}>
        <RemoveRounded />
      </IconButton>
    </div>
  );
};
