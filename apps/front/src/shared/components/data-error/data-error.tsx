import Map404 from '/map404.png';
import './data-error.scss';
import Typography from '@mui/material/Typography';
import React from 'react';

export const DataError = (): React.JSX.Element => {
  return (
    <div className='DataError'>
      <Typography color='error'>Maple404</Typography>
      <img src={Map404} alt='maple-loader-not-working' aria-label='maple-loader-not-working' />
    </div>
  );
};
