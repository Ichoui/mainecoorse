import { ItemBase } from '@shared-interfaces/items';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Chip } from '@mui/material';
import ReactDOM from 'react-dom';

const portal: HTMLElement = document.createElement('div');
portal.classList.add('allez-le-portail');
portal.setAttribute('id', 'portail');
document.body.appendChild(portal);

export const ReparentingPortal = (props: {
  item: ItemBase;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onClick?: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, provided, snapshot, onClick, onDelete } = props;
  const usePortal: boolean = snapshot?.isDragging;

  const child: JSX.Element = (
    <Chip
      className={snapshot.isDragging ? 'is-dragging' : ''}
      label={item.label}
      variant='outlined'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={() => (onClick ? onClick(true, item) : null)}
      onDelete={onDelete}
    />
  );

  if (!usePortal) {
    return child;
  }
  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal);
};
