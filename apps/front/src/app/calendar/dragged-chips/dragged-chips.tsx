import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import { useDrag } from 'react-dnd';
import '../calendar.scss';
import { usePreview } from 'react-dnd-preview';

export const DraggedChips = (props: {
  item: ItemBase;
  type: string;
  initialIndex: number;
  onDragEnd: (index: number) => void;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, type, initialIndex, onClick, onDelete, onDragEnd } = props;
  const [{ isDragging }, drag] = useDrag({
    type,
    item: item,
    canDrag: true,
    isDragging(monitor) {
      const itemLocal = monitor.getItem();
      return item?.id === itemLocal?.id;
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => onDragEnd(initialIndex),
  });
  const opacity = isDragging ? 0.4 : 1;

  const MyPreview = () => {
    const preview = usePreview();
    if (!preview.display) {
      return null;
    }
    const { item, style } = preview;
    return (
      <div className='item-list__item ' style={style}>
        <Chip label={(item as ItemBase)?.label} variant='outlined' />
      </div>
    );
  };

  return (
    <div>
      <div style={{ opacity }} ref={drag} key={Math.random()}>
        <MyPreview></MyPreview>
        <Chip
          label={item?.label}
          variant='outlined'
          onClick={() => onClick(true, item)}
          onDelete={onDelete}
          draggable={true}
        />
      </div>
    </div>
  );
};
