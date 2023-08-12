import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Draggable } from '@hello-pangea/dnd';
import { ReparentingPortal } from '@app/calendar/portal/portal';
import { useEffect } from 'react';

export const DraggedChips = (props: {
  item: ItemBase;
  identifier: string;
  index: number;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
  stopDragging: boolean;
}) => {
  const { item, identifier, index, onClick, onDelete, stopDragging } = props;
  useEffect(() => {}, [stopDragging]);

  return (
    <Draggable
      draggableId={identifier}
      isDragDisabled={stopDragging}
      index={index}
      key={identifier}
      disableInteractiveElementBlocking={stopDragging}
    >
      {(provided, snapshot) => (
        <div
          style={{ opacity: snapshot.isDragging ? 0.4 : 1, pointerEvents: stopDragging ? 'none' : 'auto' }}
          className='chip'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ReparentingPortal
            item={item}
            provided={provided}
            snapshot={snapshot}
            onClick={(confirm, item) => onClick(confirm, item)}
            onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
          />
        </div>
      )}
    </Draggable>
  );
};
