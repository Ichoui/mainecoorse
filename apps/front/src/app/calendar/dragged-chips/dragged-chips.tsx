import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { Draggable } from '@hello-pangea/dnd';

export const DraggedChips = (props: {
  item: ItemBase;
  identifier: string;
  index: string;
  onDrop: (index: number) => void;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, identifier, index, onClick, onDelete, onDrop } = props;

  // isDragging
  const opacity = false ? 0.4 : 1;
  console.log(identifier);
  return (
    <Draggable draggableId={identifier} index={item.id} key={Math.random()}>
      {(provided, snapshot) => (
        <div
          style={{ opacity }}
          key={Math.random()}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >


          <Chip
            label={item?.label}
            variant='outlined'
            onClick={() => onClick(true, item)}
            onDelete={onDelete}
            draggable={true}
          />
        </div>
      )}
    </Draggable>
  );
};
