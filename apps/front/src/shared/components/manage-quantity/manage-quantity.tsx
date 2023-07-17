import { IconButton } from '@mui/material';
import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import './manage-quantity.scss';

export const ManageQuantity = (props: {
  itemQuantity: number;
  checked?: boolean;
  onChange?: (quantity: number) => void;
}) => {
  const { itemQuantity, checked, onChange } = props;
  const [quantity, setQuantity] = useState(itemQuantity);

  useEffect(() => {
    // La valeur ne se met pas à jour dans le handleQuantity, il faut passer par un useEffect pour récupérer la donnée ! :)
    if (onChange) {
      onChange(quantity);
    }
  }, [quantity]);

  const handleQuantity = (add: boolean) => {
    if (!checked) {
      if (!add && quantity - 1 === 0) {
        // On bloque le fait de pouvoir descendre à 0, car il faut au minimum 1
        return;
      }
      setQuantity(add ? quantity + 1 : quantity - 1);
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