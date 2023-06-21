import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const DraggedChips = (props: {
  item: ItemBase;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, onClick, onDelete } = props;
  const { attributes, listeners, isDragging, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const opacity = isDragging ? 0.4 : 1;
  const touchAction = 'none';
  return (
    <div ref={setNodeRef} style={{ ...style, touchAction, opacity }} key={Math.random()} {...listeners} {...attributes}>
      <Chip
        label={item?.label}
        variant='outlined'
        onClick={e => {
          console.log(e);
          onClick(true, item);
        }}
        clickable={true}
        onDelete={onDelete}
      />
    </div>
  );
};
