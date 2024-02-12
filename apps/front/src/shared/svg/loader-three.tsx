import React from 'react';

export const LoaderThree = (): React.JSX.Element => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='24px'
      height='30px'
      viewBox='0 0 24 30'
    >
      <rect x='0' y='0' width='4' height='20' fill='#9570de'>
        <animate
          attributeName='opacity'
          attributeType='XML'
          values='1; .2; 1'
          begin='0s'
          dur='0.8s'
          repeatCount='indefinite'
        />
      </rect>
      <rect x='7' y='0' width='4' height='20' fill='#9570de'>
        <animate
          attributeName='opacity'
          attributeType='XML'
          values='1; .2; 1'
          begin='0.4s'
          dur='0.8s'
          repeatCount='indefinite'
        />
      </rect>
      <rect x='14' y='0' width='4' height='20' fill='#9570de'>
        <animate
          attributeName='opacity'
          attributeType='XML'
          values='1; .2; 1'
          begin='0.6s'
          dur='0.8s'
          repeatCount='indefinite'
        />
      </rect>
    </svg>
  );
};
