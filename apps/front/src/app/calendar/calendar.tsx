import './calendar.scss';
import { ArticleTags, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import { useCallback, useState } from 'react';
import { DragZone } from '@app/calendar/drag-zone/drag-zone';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Chip } from '@mui/material';

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
        {
          id: 8,
          label: 'Oignon',
          quantity: 2,
          description: 'C est pas bon',
          tags: [RecetteTags.PLAT],
          webImage: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
        },
        {
          id: 9,
          label: 'Frites',
          quantity: 3,
          description: 'C est vraiment pas bon ça!',
          tags: [RecetteTags.ETE],
          webImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Carrots_on_Display.jpg/800px-Carrots_on_Display.jpg',
        },
      ],
    },
  ]);

  // TODO FROM API
  const [days, setDays] = useState([
    { label: 'Samedi', slug: 'saturday', items: [divers[0]] },
    { label: 'Dimanche', slug: 'sunday', items: [] },
    { label: 'Lundi', slug: 'monday', items: [divers[2]] },
    { label: 'Mardi', slug: 'ghf', items: [] },
    { label: 'Mercredi', slug: 'cxv', items: [] },
    { label: 'Jeudi', slug: 'rth', items: [] },
    { label: 'Vendredi', slug: 'opk', items: [] },
  ]);

  const handleDrop = useCallback(
    (item: ItemBase, fromIndex: number, toIndex: number) => {
      // console.log('calendar to update', item);
      //
      console.log('calendar from', fromIndex);
      console.log('calendar to', toIndex);

      /*      setDivers(
        update(divers, {
          // [index]: {
          // lastDroppedItem: {
          //   $set: item,
          // },
          // },
        }),
      );
      setDays(update(days, {}));*/
    },
    [divers, days],
  );

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const [itemToInspect, setItemToInspect] = useState<ItemBase>();
  const handleDialogInspectItem = (open = false, item: ItemBase) => {
    console.log('CLIC');
    setOpenDialogInspectItem(open);
    setItemToInspect(item);
  };

  const sensors = useSensors(
    // useSensor(PointerSensor, {
    //   activationConstraint: {delay: 2, tolerance:5}
    // })
    // useSensor(TouchSensor),
    // useSensor(MouseSensor)
    // useSensor(TouchSensor, {
    //   activationConstraint: {
    //     delay: 400,
    //     tolerance: 5,
    //   },
    // }),
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5
      },
    })
  );

  const handleDragEnd = (e: any) => {
    console.log('end');
    console.log(e);
  };
  const handleDragStart = () => {
    console.log('start');
  };

  return (
    <div className='Calendar'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <DragZone
          items={divers}
          identifier='divers'
          onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
        />

        {days.map((day, index) => (
          <div key={day.slug} className='day'>
            <h4>{day.label}</h4>
            <DragZone
              key={day + '-' + index}
              identifier={day + '-' + index}
              items={day?.items}
              onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
              onDelete={remove => undefined}
            />
            <hr />
          </div>
        ))}
{/*        <DragOverlay>
          <Chip variant='outlined' label={'teee'} />
        </DragOverlay>*/}
      </DndContext>

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
