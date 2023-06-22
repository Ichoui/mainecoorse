import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Droppable } from '@hello-pangea/dnd';
import { Fragment } from 'react';

export const DragZone = (props: {
  items: ItemBase[];
  identifier: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
  onDrop: (item: ItemBase, fromIndex: number, toIndex: number) => void;
}) => {
  const { items, identifier, onClick, onDelete, onDrop } = props;

  return (
    <Droppable droppableId={identifier}>
      {(provided, snapshot) => (
        <div className='chips' ref={provided.innerRef} {...provided.droppableProps} >

          <div className={`${snapshot.isDraggingOver ? 'active' : ''}`}>
            {provided.placeholder}

            {items.map((item, index) => (
              <DraggedChips
                key={Math.random()} // TODO ID from API à rajouter !
                item={item}
                identifier={identifier + '-' + index}
                index={index}
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
      )}
    </Droppable>
  );
};
