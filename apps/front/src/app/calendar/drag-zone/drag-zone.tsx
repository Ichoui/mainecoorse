import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Droppable } from '@hello-pangea/dnd';
import { ReparentingPortal } from '@app/calendar/portal/portal';

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
      // getContainerForClone={(e)=> (<Testt/>)}
      mode='virtual'
      renderClone={(provided, snapshot, rubric) => (
        <ReparentingPortal
          item={items[rubric.source.index]}
          provided={provided}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        ></ReparentingPortal>
      )}
    >
      {(provided, snapshot) => (
        <div className='chips' ref={provided.innerRef} {...provided.droppableProps}>
          <div className={`${snapshot.isDraggingOver ? 'active' : ''}`}>
            {items.map((item, index) => (
              <DraggedChips
                key={identifier + '-' + index} // TODO ID from API à rajouter !
                item={item}
                identifier={identifier + '-' + index}
                index={index}
                onClick={(confirm, item) => onClick(confirm, item)}
                onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
              />
            ))}
            {/*{provided.placeholder}*/}
          </div>
        </div>
      )}
    </Droppable>
  );
};
