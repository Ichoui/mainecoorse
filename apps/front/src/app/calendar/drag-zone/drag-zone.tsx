import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Droppable } from '@hello-pangea/dnd';
import { Fragment } from 'react';
import { Chip } from '@mui/material';

export const DragZone = (props: {
  items: ItemBase[];
  identifier: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { items, identifier, onClick, onDelete } = props;

  return (
    <Droppable
      droppableId={identifier}
      mode='virtual'
      renderClone={(provided, snapshot, rubric) => (
        <Chip
          label={items[rubric.source.index].label}
          variant='outlined'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        />
      )}
    >
      {(provided, snapshot) => (
        <div className='chips' ref={provided.innerRef} {...provided.droppableProps}>
          <div className={`${snapshot.isDraggingOver ? 'active' : ''}`}>
            {items.map((item, index) => (
              <DraggedChips
                key={Math.random()} // TODO ID from API à rajouter !
                item={item}
                identifier={identifier + '-' + index}
                index={index}
                onClick={(confirm, item) => onClick(confirm, item)}
                onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};
