import './calendar.scss';
import { ArticleTags, Days, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import { useCallback, useEffect, useState } from 'react';
import { DragTypes } from '@shared/interfaces/DragTypes';
import { DndProvider } from 'react-dnd';
import { DragZone } from '@app/calendar/drag-zone/drag-zone';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { from } from 'rxjs';
import { DragDropContext } from '@hello-pangea/dnd';

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
      slug: 'saturday',
      items: [
        {
          id: 8,
          label: 'Oignon',
          itemType:ItemType.RECETTE,
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
    { label: 'Dimanche', slug: 'sunday', items: [] },
    {
      label: 'Lundi',
      slug: 'monday',
      items: [
        {
          id: 9,
          label: 'Frites',
          itemType:ItemType.ARTICLE,
          description: 'Ma description',
          webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
          tags: [ArticleTags.BOISSONS, ArticleTags.EPICERIE],
        },
      ],
    },
    { label: 'Mardi', slug: 'tuesday', items: [
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

      ] },
    { label: 'Mercredi', slug: 'wednesday', items: [] },
    { label: 'Jeudi', slug: 'thursday', items: [] },
    { label: 'Vendredi', slug: 'friday', items: [] },
  ]);

  const handleDrop = useCallback((item: ItemBase, fromIndex: number, toIndex: number) => {
    // console.log('calendar to update', item);
    //
    // console.log('calendar from', fromIndex);
    // console.log('calendar to', toIndex);
    // console.log('target', targetChange);
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
  }, []);

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const [itemToInspect, setItemToInspect] = useState<ItemBase>();
  const handleDialogInspectItem = (open = false, item: ItemBase) => {
    setOpenDialogInspectItem(open);
    setItemToInspect(item);
  };

  const handleOnDragEnd = (e: any) => {
    // console.log(e);
  };

  const handleOnDragStart = (e: any) => {
    // console.log(e);
  };

  return (
    <div className='Calendar'>
      <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
        <DragZone
          key={Math.random()} // TODO ID from API à rajouter !
          items={divers}
          identifier='divers'
          onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
          onDrop={(item, fromIndex, toIndex) => handleDrop(item, 8888, 4467)}
        />
        {days.map((day, index) => (
          <div key={day.slug} className='day'>
            <h4>{day.label}</h4>
            <DragZone
              key={Math.random()} // TODO ID from API à rajouter !
              items={day.items}
              identifier={day.slug}
              onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
              onDelete={remove => undefined}
              onDrop={(item, fromIndex, toIndex) => handleDrop(item, 77, index)}
            />
            <hr />
          </div>
        ))}
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
