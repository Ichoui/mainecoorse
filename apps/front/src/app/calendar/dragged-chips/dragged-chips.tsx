import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Draggable } from '@hello-pangea/dnd';
import { ReparentingPortal } from '@app/calendar/portal/portal';

export const DraggedChips = (props: {
  item: ItemBase;
  identifier: string;
  index: number;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, identifier, index, onClick, onDelete } = props;

  return (
    <Draggable draggableId={identifier} index={index} key={identifier} shouldRespectForcePress={true}>
      {(provided, snapshot) => (
        <div
          style={{ opacity: snapshot.isDragging ? 0.4 : 1 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/*<Chip*/}
          {/*  label={item?.label}*/}
          {/*  variant='outlined'*/}
          {/*  onClick={() => onClick(true, item)}*/}
          {/*  onDelete={onDelete}*/}
          {/*/>*/}
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


