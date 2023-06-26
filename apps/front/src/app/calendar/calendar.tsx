import './calendar.scss';
import { ArticleTags, Days, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import { useCallback, useState } from 'react';
import { DragZone } from '@app/calendar/drag-zone/drag-zone';
import { DragDropContext, useKeyboardSensor, useMouseSensor } from '@hello-pangea/dnd';
import update from 'immutability-helper';
import useTouchSensor from './use-touch-sensor';
import { BinZone } from '@app/calendar/drag-zone/bin-zone';

// https://www.npmjs.com/package/react-draggable
export const Calendar = () => {
  // TODO FROM API
  const [divers, setDivers] = useState<ItemBase[]>([
    {
      id: 1,
      label: 'Article 1',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    },
    {
      id: 3,
      label: 'Article 2',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    },
    {
      id: 4,
      label: 'Article 3',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    },
    {
      id: 5,
      label: 'Article 4',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    },
    {
      id: 8,
      label: 'Article 4',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
    },
    {
      id: 2,
      label: 'Recette1 1',
      itemType: ItemType.RECETTE,
      description:
        'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [RecetteTags.ENTREE, RecetteTags.LONG, RecetteTags.DESSERT],
      articlesList: [
        {
          id: 7,
          label: 'Frites',
          quantity: 5,
          description: 'Les frites belges ou les frites ricaines ?',
          tags: [RecetteTags.COURT],
          webImage:
            'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
        },
      ],
    },
  ]);

  // TODO FROM API
  const [days, setDays] = useState<Days[]>([
    {
      label: 'Samedi',
      id: 0,
      slug: 'saturday',
      items: [
        {
          id: 14,
          label: 'boule',
          itemType: ItemType.ARTICLE,
          description: 'Ma description',
          webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
          tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
        },
        {
          id: 13,
          label: 'djak',
          itemType: ItemType.ARTICLE,
          description: 'Ma description',
          webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
          tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
        },
        {
          id: 8,
          label: 'Oignon',
          itemType: ItemType.RECETTE,
          description: 'C est pas bon',
          tags: [RecetteTags.PLAT],
          webImage: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
          articlesList: [
            {
              id: 12,
              label: 'Sympa hnon?',
              quantity: 5,
              description: 'azerdftghjklm',
              tags: [RecetteTags.COURT],
              webImage:
                'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
            },
          ],
        },
      ],
    },
    { label: 'Dimanche', id: 1, slug: 'sunday', items: [] },
    {
      label: 'Lundi',
      id: 2,
      slug: 'monday',
      items: [
        {
          id: 9,
          label: 'Frites',
          itemType: ItemType.ARTICLE,
          description: 'Ma description',
          webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
          tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
        },
      ],
    },
    {
      label: 'Mardi',
      id: 3,
      slug: 'tuesday',
      items: [
        {
          id: 10,
          label: 'Recette2',
          itemType: ItemType.RECETTE,
          description:
            'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
          webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
          tags: [RecetteTags.ENTREE, RecetteTags.LONG, RecetteTags.DESSERT],
          articlesList: [
            {
              id: 9,
              label: 'frater',
              quantity: 5,
              description: 'azerdftghjklm',
              tags: [RecetteTags.COURT],
              webImage:
                'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
            },
          ],
        },
      ],
    },
    { label: 'Mercredi', id: 4, slug: 'wednesday', items: [] },
    { label: 'Jeudi', id: 5, slug: 'thursday', items: [] },
    { label: 'Vendredi', id: 6, slug: 'friday', items: [] },
  ]);

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
        // Vers divers
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
        // Supprimer un item depuis divers
        if (source.droppableId === 'divers') {
          setDivers(update(divers, { $splice: [[source.index, 1]] }));
        } else {
          // Supprimer un item depuis un jour
          setDays(
            update(days, {
              [dragZoneIndex(e.source.droppableId)]: { items: { $splice: [[source.index, 1]] } },
            }),
          );
        }
      } else {
        // Depuis divers vers un jour
        if (source.droppableId === 'divers') {
          const item = divers[e.source.index];
          setDays(
            update(days, {
              [dragZoneIndex(e.destination.droppableId)]: { items: { $push: [item] } },
            }),
          );

          setDivers(update(divers, { $splice: [[source.index, 1]] }));
        } else {
          // Depuis un jour vers un jour
          const item = days[dragZoneIndex(e.source.droppableId)].items[e.source.index];
          setDays(
            update(days, {
              [dragZoneIndex(e.source.droppableId)]: { items: { $splice: [[source.index, 1]] } }, // remove
              [dragZoneIndex(e.destination.droppableId)]: { items: { $push: [item] } }, // add
            }),
          );
        }
      }
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
        {days.map(day => (
          <div key={day.slug} className='day'>
            <h4>{day.label}</h4>
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
