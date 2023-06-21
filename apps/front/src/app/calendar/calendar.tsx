import './calendar.scss';
import { ArticleTags, ItemBase, ItemType, RecetteTags } from '@shared-interfaces/items';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import { useCallback, useState } from 'react';
import { DraggedChips } from '@app/calendar/dragged-chips/dragged-chips';
import { DragTypes } from '@shared/interfaces/DragTypes';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper2';
import { DragZone } from '@app/calendar/drag-zone/drag-zone';

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
    { label: 'Samedi', slug: 'azf', items: [divers[1], divers[0], divers[1], divers[0], divers[0], divers[0]] },
    { label: 'Dimanche', slug: 'sqsqs', items: [divers[0]] },
    { label: 'Lundi', slug: 'ggbh', items: [divers[0], divers[1]] },
    { label: 'Mardi', slug: 'ghf', items: [divers[1]] },
    { label: 'Mercredi', slug: 'cxv', items: [divers[0], divers[1]] },
    { label: 'Jeudi', slug: 'rth', items: [divers[1], divers[0], divers[1], divers[0], divers[0]] },
    { label: 'Vendredi', slug: 'opk', items: [divers[1]] },
  ]);

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item;
      setDivers(
        update(divers, {
          [index]: {
            // lastDroppedItem: {
            //   $set: item,
            // },
          },
        }),
      );
      setDays(update(days, {}));
    },
    [divers, days],
  );

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const [itemToInspect, setItemToInspect] = useState<ItemBase>();
  const handleDialogInspectItem = (open = false, item: ItemBase) => {
    setOpenDialogInspectItem(open);
    setItemToInspect(item);
  };

  return (
    <div className='Calendar'>
      <DndProvider backend={TouchBackend}>
        <div className='divers'>
          <DragZone
            items={divers}
            type={DragTypes.DIVERS}
            onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
          />
        </div>

        {days.map(day => (
          <div key={day.slug} className='day'>
            <h4>{day.label}</h4>
            <div className='chip'>
              <DragZone
                key={Math.random()} // TODO ID from API à rajouter !
                items={day.items}
                type={DragTypes.ITEM}
                onClick={(confirm, item) => handleDialogInspectItem(confirm, item)}
                onDelete={(remove) => undefined}
              />
            </div>
            <hr />
          </div>
        ))}
      </DndProvider>

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
