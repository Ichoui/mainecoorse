import { Chip } from '@mui/material';
import React from 'react';
import { ItemBase } from '@shared-interfaces/items';

export const DraggedChips = (props: {
  item: ItemBase;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: () => void;
}) => {
  const { item, onClick, onDelete } = props;

  return (
    <Chip key={item.id} label={item.label} variant='outlined' onClick={() => onClick(true, item)} onDelete={onDelete} />
  );
};
