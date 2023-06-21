import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { ItemBase } from '@shared-interfaces/items';
import '../calendar.scss';
import { useDroppable } from '@dnd-kit/core';

export const DragZone = (props: {
  items?: ItemBase[];
  onClick: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
  identifier: string;
}) => {
  const { items, identifier, onClick, onDelete } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: identifier,
  });
  const touchAction = 'none'


  return (
    <div className='chips' ref={setNodeRef} >
      <div className={`${isOver ? 'active' : ''}`}>
        {items!.map((item, index) => (
          <div
            style={{touchAction}}
            key={identifier + item.id}
          >
          <DraggedChips
            item={item}
            onClick={(confirm, item) => onClick(confirm, item)}
            onDelete={onDelete ? (remove: boolean) => onDelete(remove) : onDelete}
          />
          </div>
        ))}
      </div>
    </div>
  );
};
