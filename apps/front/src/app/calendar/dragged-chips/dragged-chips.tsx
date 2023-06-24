import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Draggable } from '@hello-pangea/dnd';

export const DraggedChips = (props: {
  item: ItemBase;
  identifier: string;
  index: number;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, identifier, index, onClick, onDelete } = props;

  return (
    <Draggable draggableId={identifier} index={index} key={Math.random()}>
      {(provided, snapshot) => (
        <div
          style={{ opacity: snapshot.isDragging ? 0.4 : 1 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Chip
            label={item?.label}
            variant='outlined'
            onClick={() => onClick(true, item)}
            onDelete={onDelete}
            // draggable={true}
          />
        </div>
      )}
    </Draggable>
  );
};
