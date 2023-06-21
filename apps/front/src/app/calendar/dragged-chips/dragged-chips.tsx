import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import { useDrag } from 'react-dnd';

export const DraggedChips = (props: {
  item: ItemBase;
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, type, onClick, onDelete } = props;
  const [{ isDragging }, drag] = useDrag({
    type,
    item: item.label,
    isDragging(monitor) {
      const i = monitor.getItem();
      console.log(i);
      // return name === i.name;
      return true;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div style={{ opacity }}>
      <Chip
        key={item.id}
        ref={drag}
        label={item.label}
        variant='outlined'
        onClick={() => onClick(true, item)}
        onDelete={onDelete}
      />
    </div>
  );
};
