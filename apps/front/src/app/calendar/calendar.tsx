import './calendar.scss';
import { Days, ItemBase, ItemType, translateDays } from '@shared-interfaces/items';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import React, { useCallback, useEffect, useState } from 'react';
import { DragZone } from '@app/calendar/drag-zone/drag-zone';
import { DragDropContext, useKeyboardSensor, useMouseSensor } from '@hello-pangea/dnd';
import update from 'immutability-helper';
import useTouchSensor from './use-touch-sensor';
import { BinZone } from '@app/calendar/drag-zone/bin-zone';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { axiosUrl, configAxios } from '@shared/hooks/axios.config';

// https://www.npmjs.com/package/react-draggable
export const Calendar = () => {
  const [divers, setDivers] = useState<ItemBase[]>([]);
  const [days, setDays] = useState<Days[]>([]);

  const [{ data: getItemsData, error: itemsError, loading: loadingItem }] = configAxios({
    url: 'calendar/divers',
    method: 'GET',
    autoCancel: false,
  });
  const [{ data: getDaysData, error: daysError, loading: loadingError }] = configAxios({
    url: 'calendar/days',
    method: 'GET',
    autoCancel: false,
  });

  // eslint-disable-next-line no-empty-pattern
  const [{}, executePutDivers] = configAxios({
    url: '',
    method: 'PUT',
    manual: true,
  });

  // eslint-disable-next-line no-empty-pattern
  const [{}, executeRemove] = configAxios({
    url: '',
    method: 'DELETE',
    manual: true,
  });

  useEffect(() => {
    setDivers(getItemsData);
    setDays(getDaysData);
  }, [getItemsData, getDaysData, itemsError, daysError, loadingError, loadingItem]);

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const [itemToInspect, setItemToInspect] = useState<ItemBase>();
  const handleDialogInspectItem = (open = false, item: ItemBase) => {
    setOpenDialogInspectItem(open);
    setItemToInspect(item);
  };
  const [isDragging, setIsDragging] = useState(false);

  const handleOnDragEnd = useCallback(
    (e: any) => {
      setIsDragging(false);
      if (!e.destination || e.source.droppableId === e.destination.droppableId) {
        return;
      }
      const source = e.source;
      const destination = e.destination;
      const dragZoneIndex = (droppableId: string) => days.findIndex(d => d.slug === droppableId);

      if (destination.droppableId === 'divers') {
        const item = days[dragZoneIndex(e.source.droppableId)].items[e.source.index];
        /////////////////
        // Vers DIVERS
        /////////////////
        setDivers(
          update(divers, {
            $push: [item],
          }),
        );
        setDays(
          update(days, {
            [dragZoneIndex(e.source.droppableId)]: { items: { $splice: [[source.index, 1]] } },
          }),
        );
      } else if (destination.droppableId === 'bin') {
        /////////////////
        // Supprimer ITEM depuis DIVERS
        /////////////////
        if (source.droppableId === 'divers') {
          const item = divers[e.source.index];
          setDivers(update(divers, { $splice: [[source.index, 1]] }));
          console.log(item);
          executeRemove({ params: { id: item?.tableIdentifier }, url: axiosUrl('calendar/divers') });
        } else {
          /////////////////
          // Supprimer ITEM depuis JOUR
          /////////////////
          const item = days[dragZoneIndex(e.source.droppableId)].items[e.source.index];
          setDays(
            update(days, {
              [dragZoneIndex(e.source.droppableId)]: { items: { $splice: [[source.index, 1]] } },
            }),
          );
          executeRemove({ params: { id: item?.id }, url: axiosUrl('calendar/days') });
        }
      } else {
        /////////////////
        // Depuis DIVERS vers JOUR
        /////////////////
        if (source.droppableId === 'divers') {
          const item = divers[e.source.index];
          setDays(
            update(days, {
              [dragZoneIndex(e.destination.droppableId)]: { items: { $push: [item] } },
            }),
          );

          setDivers(update(divers, { $splice: [[source.index, 1]] }));
        } else {
          /////////////////
          // Depuis JOUR vers JOUR
          /////////////////
          const item = days[dragZoneIndex(e.source.droppableId)].items[e.source.index];
          setDays(
            update(days, {
              [dragZoneIndex(e.source.droppableId)]: { items: { $splice: [[source.index, 1]] } }, // remove
              [dragZoneIndex(e.destination.droppableId)]: { items: { $push: [item] } }, // add
            }),
          );
        }
      }
      console.log(days);
    },
    [days, divers],
  );

  const handleOnBeforeCapture = () => {
    setIsDragging(true);
  };

  const handleOnDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
  };

  return (
    <div className='Calendar'>
      {loadingItem && loadingError && <Loader />}
      {(itemsError || daysError) && <DataError />}

      {!loadingError && !loadingItem && (!itemsError || !daysError) && (
        <DragDropContext
          onBeforeCapture={handleOnBeforeCapture}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
          enableDefaultSensors={false}
          sensors={[useTouchSensor, useKeyboardSensor, useMouseSensor]}
        >
          <div className='divers'>
            <DragZone
              key={Math.random()}
              items={divers}
              identifier='divers'
              onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
            />
          </div>
          <hr className='separator-divers-day' />
          {days?.map(day => (
            <div key={day.slug} className='day'>
              <h3>{translateDays(day.slug)}</h3>
              <DragZone
                key={Math.random()}
                items={day.items}
                identifier={day.slug}
                onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
              />
              <hr />
            </div>
          ))}

          <div className='bin'>
            <BinZone key={Math.random()} identifier='bin' isDragging={isDragging} />
          </div>
        </DragDropContext>
      )}

      {/*OPEN DIALOG TON INSPECT ITEM IN READONLY*/}
      {openDialogInspectItem && (
        <DialogInspectItem
          open={openDialogInspectItem}
          onClose={() => handleDialogInspectItem(false, itemToInspect!)}
          isArticle={itemToInspect!.itemType === ItemType.ARTICLE}
          item={itemToInspect!}
        />
      )}
    </div>
  );
};

const updateDaysOrDivers = (type: 'divers' | 'days') => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePutDivers] = configAxios({
    url: `calendar/${type}`,
    method: 'PUT',
    manual: true,
  });
  executePutDivers({
    data: {},
  });
};
