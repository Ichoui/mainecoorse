import './calendar.scss';
import { ItemBase, ItemType, Tags } from '@shared-interfaces/items';
import { Chip } from '@mui/material';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import React, { useState } from 'react';
// https://www.npmjs.com/package/react-draggable
export const Calendar = () => {
  const divers: ItemBase[] = [
    {
      id: 1,
      label: 'Article 1',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [Tags.FRAIS, Tags.POISSON],
    },
    {
      id: 2,
      label: 'Recette1 1',
      itemType: ItemType.RECETTE,
      description:
        'Je suis un castor né au canada, ca t en bouche un coin ? Moi aussi, et je vais te le ronger ton coin ! Allez, crocs!',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [Tags.FRAIS, Tags.VIANDE],
      articlesList: [
        {
          id: 7,
          label: 'Frites',
          quantity: 5,
          description: 'Les frites belges ou les frites ricaines ?',
          tags: [Tags.FRAIS, Tags.VIANDE],
          webImage:
            'https://img-3.journaldesfemmes.fr/C5EOtA1h6Kn6_Jthz_R1nZWVOac=/1500x/smart/d72f4f8d3c6a45699a979e56df4b2d53/ccmcms-jdf/10820734.jpg',
        },
        {
          id: 8,
          label: 'Oignon',
          quantity: 2,
          description: 'C est pas bon',
          tags: [Tags.POISSON],
          webImage: 'https://jardinage.lemonde.fr/images/dossiers/historique/oignons2-155448.jpg',
        },
        {
          id: 9,
          label: 'Frites',
          quantity: 3,
          description: 'C est vraiment pas bon ça!',
          tags: [Tags.VIANDE],
          webImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Carrots_on_Display.jpg/800px-Carrots_on_Display.jpg',
        },
      ],
    },
  ];

  const days = [
    { label: 'Samedi', slug: 'sunday', items: [divers[1]] },
    { label: 'Dimanche', slug: 'sunday', items: [divers[0]] },
    { label: 'Lundi', slug: 'sunday', items: [divers[0]] },
    { label: 'Mardi', slug: 'sunday', items: [divers[1]] },
    { label: 'Mercredi', slug: 'sunday', items: [divers[0]] },
    { label: 'Jeudi', slug: 'sunday', items: [divers[1]] },
    { label: 'Vendredi', slug: 'sunday', items: [divers[1]] },
  ];

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const [itemToInspect, setItemToInspect] = useState<ItemBase>();
  const handleDialogInspectItem = (open = false, item: ItemBase) => {
    setOpenDialogInspectItem(open);
    setItemToInspect(item);
  };

  return (
    <div className='Calendar'>
      {divers.map(item => (
        <div key={item.id} className='divers'>
          <Chip label={item.label} variant='outlined' onClick={() => handleDialogInspectItem(true, item)} />
        </div>
      ))}

      {days.map(day => (
        <div key={day.slug} className='day'>
          <h4>{day.label}</h4>
          {day.items.map(item => (
            <Chip
              key={item.id}
              label={item.label}
              variant='outlined'
              onClick={() => handleDialogInspectItem(true, item)}
              onDelete={() => null}
            />
          ))}
          <hr />
        </div>
      ))}

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
