import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { DragTypes } from '@shared/interfaces/DragTypes';
import '../calendar.scss';
import { useState } from 'react';

export const DragZone = (props: {
  items?: ItemBase[];
  type: string;
  initialIndex: number;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
  onDrop: (item: ItemBase, fromIndex: number, toIndex: number) => void;
}) => {
  const { items, type, initialIndex, onClick, onDelete, onDrop } = props;
  const [canDrop, setCanDrop] = useState<boolean>(false);
  const [fromIndex, setFromIndex] = useState<number>();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [DragTypes.DIVERS, DragTypes.ITEM],
      collect: monitor => ({
        isOver: monitor?.isOver({ shallow: true }),
      }),
      hover: (item, monitor) => {
        setCanDrop(monitor.canDrop());
      },
      drop: (item: ItemBase, monitor: DropTargetMonitor) => {
        console.log(initialIndex);
        // This is after drag!
        // console.log('to', toIndex);
        // Pour compréhension : initialIndex est l'index de la zone de base, drop est invoqué sur une nouvelle zone après avoir drop
        // return onDrop(item, initialIndex, fromIndex!);
      },
    }),
    [items],
  );
  // console.log(toIndex);
  const isActive = isOver && canDrop;

  return (
    <div className='chips' ref={drop}>
      <div className={`${isActive ? 'active' : ''}`}>
        {items!.map((item, index) => (
          <DraggedChips
            initialIndex={initialIndex}
            key={Math.random()} // TODO ID from API à rajouter !
            item={item}
            type={type}
            onClick={(confirm, item) => onClick(confirm, item)}
            onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
            onDragEnd={index => {
              console.log(index);
              setFromIndex(index);
              console.log(initialIndex);
              console.log(fromIndex);
              onDrop(item, initialIndex, index)
            }}
          />
        ))}
      </div>
    </div>
  );
};
