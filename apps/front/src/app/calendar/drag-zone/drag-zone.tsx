import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import { Fragment } from 'react';

export const DragZone = (props: {
  items: ItemBase[];
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { items, type, onClick, onDelete } = props;

  return (
    <Fragment>
      {items.map(item => (
        <DraggedChips
          key={Math.random()} // TODO ID from API à rajouter !
          item={item}
          type={type}
          onClick={(confirm, item) => onClick(confirm, item)}
          onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
        />
      ))}
    </Fragment>
  );
};
