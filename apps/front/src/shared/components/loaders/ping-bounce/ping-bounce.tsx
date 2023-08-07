import Maple from '../maple.png';
import './ping-bounce.scss';
import React from 'react';

export const PingBounce = (): JSX.Element => {
  const maples: JSX.Element[] = [];
  for (let i = 0; i < 40; i++) {
    maples.push(<img key={i} src={Maple} alt='waiting server' aria-label='waiting server' />);
  }

  return (
    <div className='PingBounce'>
      {maples}
      <span className='message'>
        <span>🧙🏼‍♂️</span>Chargement de l'application...
      </span>
    </div>
  );
};
