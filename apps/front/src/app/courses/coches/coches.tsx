import { Checkbox, FormControlLabel } from '@mui/material';
import { CoursesArticleList } from '@shared-interfaces/items';
import { ChangeEvent, Fragment, useState } from 'react';
import './coches.scss';
import { ManageQuantity } from '@components/manage-quantity/manage-quantity';

export const Coches = (props: { item: CoursesArticleList }) => {
  const { item } = props;
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    // TODO API update la valeur (ou remonter la valeur je ne sais pas encore)
  };

  return (
    <div className='Coches'>
      <FormControlLabel
        className={`label ${checked ? 'checked' : ''}`}
        control={<Checkbox onChange={handleChange} checked={checked} />}
        label={
          <Fragment>
            <img src={item.url} alt={item.label} />
            <span>{item.label}</span>
          </Fragment>
        }
      />

      <div className={`quantity ${checked ? 'disabled' : ''}`}>
        <ManageQuantity itemQuantity={item.quantity} checked={checked} />
      </div>
    </div>
  );
};
