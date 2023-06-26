import '../calendar.scss';
import { Droppable } from '@hello-pangea/dnd';
import { DeleteForeverRounded } from '@mui/icons-material';

export const BinZone = (props: { identifier: string, isDragging: boolean }) => {
  const { identifier, isDragging } = props;

  return (
    <Droppable droppableId={identifier}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`trash ${snapshot.isDraggingOver ? 'active' : ''} ${isDragging ? 'is-dragging' : ''}`}
        >
          <DeleteForeverRounded />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
