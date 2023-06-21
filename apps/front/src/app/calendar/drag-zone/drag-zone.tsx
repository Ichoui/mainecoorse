import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';

export const DragZone = (props: {
  items: ItemBase[];
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: () => void;
}) => {
  const { items, type, onClick, onDelete } = props;
  return (
    <div>
      {items.map(item => (
        <DraggedChips
          key={Math.random()} // TODO ID from API à rajouter !
          item={item}
          type={type}
          onClick={(confirm, item) => onClick(confirm, item)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
