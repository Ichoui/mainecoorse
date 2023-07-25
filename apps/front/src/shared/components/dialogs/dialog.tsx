import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

export const DialogTransitionUp = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction='up' ref={ref} {...props} />,
);
