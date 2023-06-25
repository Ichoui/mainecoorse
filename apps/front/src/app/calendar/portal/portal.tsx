import { ItemBase } from '@shared-interfaces/items';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Chip } from '@mui/material';
import ReactDOM from 'react-dom';

const portal: HTMLElement = document.createElement('div');
portal.classList.add('allez-le-portail');
portal.setAttribute('id', 'portail');
document.body.appendChild(portal);


// --> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md position ifxed
// --> docu random
// https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/portal/portal-app.jsx
// https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/reparenting.md
export const ReparentingPortal = (props: {
  item: ItemBase;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  onClick?: (confirm: boolean, item: ItemBase) => void;
  onDelete?: (remove: boolean) => void | undefined;
}) => {
  const { item, provided, snapshot, onClick, onDelete } = props;
  const usePortal: boolean = snapshot?.isDragging;

  if (usePortal) {
    /*    document.addEventListener('touchmove', event => {
      // console.log(event);
      const targetDiv = document?.getElementById('portail')?.getElementsByClassName('chip')[0] as HTMLElement;
      targetDiv!.style.transform = `translate(${event.touches[0].clientX}px, ${event.touches[0].clientY}) !important`;
      console.log(targetDiv);
    });*/
  }

  const child: JSX.Element = (
    <Chip
      className={snapshot.isDragging ? 'is-dragging' : ''}
      label={item.label}
      variant='outlined'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      onClick={() => onClick ? onClick(true, item) : null}
      onDelete={onDelete}
    />
  );

  if (!usePortal) {
    return child;
  }
  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal);
};
