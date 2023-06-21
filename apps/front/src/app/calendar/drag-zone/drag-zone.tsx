import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import { useDrop } from 'react-dnd';
import { DragTypes } from '@shared/interfaces/DragTypes';
import '../calendar.scss';

export const DragZone = (props: {
  items: ItemBase[];
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
  onDrop: (item: ItemBase) => void;
}) => {
  const { items, type, onClick, onDelete, onDrop } = props;
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [DragTypes.DIVERS, DragTypes.ITEM],
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: ItemBase) => {
        console.log('dragzone', item);
        return onDrop(item);
      },
    }),
    [DragTypes.DIVERS, DragTypes.ITEM],
  );

  const isActive = isOver && canDrop;

  return (
    <div className={`chips`} ref={drop}>
      <div className={`${isActive ? 'active' : ''}`}>
        {items.map(item => (
          <DraggedChips
            key={Math.random()} // TODO ID from API à rajouter !
            item={item}
            type={type}
            onClick={(confirm, item) => onClick(confirm, item)}
            onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
          />
        ))}
      </div>
    </div>
  );
};
