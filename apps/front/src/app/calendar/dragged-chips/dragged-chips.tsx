import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import { useDrag } from 'react-dnd';
import '../calendar.scss';

export const DraggedChips = (props: {
  item: ItemBase;
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, type, onClick, onDelete } = props;
  const [{ isDragging }, drag] = useDrag({
    type,
    item: item,
    canDrag: true,
    isDragging(monitor) {
      const itemLocal = monitor.getItem();
      return item.id === itemLocal.id;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  // Checker que la clef soit === à l'id pour l'opacité par exemple ?
  return (
    <div style={{ opacity }} ref={drag} key={Math.random()}>
      <Chip label={item.label} variant='outlined' onClick={() => onClick(true, item)} onDelete={onDelete} />
    </div>
  );
};
