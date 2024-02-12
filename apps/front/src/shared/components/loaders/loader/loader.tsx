import Maple from '../maple.png';
import './loader.scss';
import React from 'react';

export const Loader = (): React.JSX.Element => {
  return (
    <div className='Loader'>
      <img src={Maple} alt='maple-loader-not-working' aria-label='maple-loader-not-working' />
    </div>
  );
};
