import { Chip } from '@mui/material';
import { ItemBase } from '@shared-interfaces/items';
import { useDrag } from 'react-dnd';
import '../calendar.scss';
import { Fragment, useContext } from 'react';
import { Preview } from 'react-dnd-preview';

export const DraggedChips = (props: {
  item: ItemBase;
  type: string;
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, type, onClick, onDelete } = props;
  const [{ isDragging }, drag, preview] = useDrag({
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
  });
  const opacity = isDragging ? 0.4 : 1;

  /*

  const isDraggingOtherone = isSelected && Boolean(dragRef &&  drag && dragRef !== drag);

  useEffect(() => {
    if (!isDragging) {
      onStop();
      return;
    }
    onStartRef(drag);
  }, [isDragging]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);


  const ChipDragPreview = () => {
    const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer(monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

    if (!isDragging) {
      return null;
    }

    function getItemStyles(
      initialOffset: XYCoord | null,
      currentOffset: XYCoord | null,
    ) {
      if (!initialOffset || !currentOffset) {
        return {
          display: 'none',
        }
      }

      let { x, y } = currentOffset

      const transform = `translate(${x}px, ${y}px)`
      return {
        transform,
        WebkitTransform: transform,
      }
    }

    console.log(item);
    return (
      <div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 100,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <span style={getItemStyles(initialOffset, currentOffset)}>
          <Chip label={item?.label} variant='outlined' />
        </span>
      </div>
    );
  };
*/
  // @ts-ignore
  const generatePreview = ({ item, style }) => {
    return (
      <div  className="item-list__item " style={style}>
      <Chip
        label={item?.label}
        variant='outlined'
      />
      </div>
    );
  };
  return (
    <Fragment>
      {/*<ChipDragPreview></ChipDragPreview>*/}
      <div style={{ opacity }} ref={drag} key={Math.random()}>
        <Preview generator={generatePreview}></Preview>
        <Chip
          label={item?.label}
          variant='outlined'
          onClick={() => onClick(true, item)}
          onDelete={onDelete}
          draggable={true}
        />
      </div>
    </Fragment>
  );
};
