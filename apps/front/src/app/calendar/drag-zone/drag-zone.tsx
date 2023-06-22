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
  onChange: (targetIndex: number) => void
}) => {
  const { items, type, initialIndex, onClick, onDelete, onDrop, onChange } = props;
  const [fromIndex, setFromIndex] = useState<number>();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [DragTypes.DIVERS, DragTypes.ITEM],
      collect: monitor => ({
        isOver: monitor?.isOver(),
      }),
      hover: (item, monitor) => {
        // console.log(initialIndex);
          onChange(initialIndex)
          // setFromIndex(initialIndex)
      },
      drop: (item: ItemBase, monitor: DropTargetMonitor) => {
          // console.log(initialIndex); // vers quel index
          // console.log(fromIndex);
          console.log(initialIndex);
          onDrop(item, initialIndex, initialIndex);

        // This is after drag!
        // console.log('to', toIndex);
        // Pour compréhension : initialIndex est l'index de la zone de base, drop est invoqué sur une nouvelle zone après avoir drop
        // onDrop(item, initialIndex, fromIndex!);
      },
    }),

    [items],
  );
  // console.log(toIndex);
    return (
    <div className='chips' ref={drop} id={String(initialIndex)}>
      <div className={`${isOver ? 'active' : ''}`}>
        {items!.map(item => (
          <DraggedChips
            initialIndex={initialIndex}
            fromIndex={fromIndex!}
            key={Math.random()} // TODO ID from API à rajouter !
            item={item}
            type={type}
            onClick={(confirm, item) => onClick(confirm, item)}
            onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
            onDrop={index => {

                // console.log(item);
                // console.log(index);
                // console.log(initialIndex);
              // console.log(index);
              // setFromIndex(index);
              // console.log(initialIndex);
                console.log(index);
                // console.log(fromIndex);
              // onDrop(item, initialIndex, index)
            }}
          />
        ))}
      </div>
    </div>
  );
};
