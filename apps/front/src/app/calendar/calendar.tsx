import './calendar.scss';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { Chip } from '@mui/material';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import React, { useState } from 'react';

export const Calendar = () => {
  const days = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const divers: ItemBase[] = [
    {
      id: 1,
      label: 'Article 1',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [],
    },
    {
      id: 2,
      label: 'Recette1 1',
      itemType: ItemType.RECETTE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [],
      articlesList: [],
    },
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
        <div key={day} className='day'>
          <h4>{day}</h4>
          <Chip label={day} variant='outlined' onClick={() => handleDialogInspectItem(true, divers[0])} />
          <hr />
        </div>
      ))}

      {/*OPEN DIALOG TON INSPECT ITEM IN READONLY*/}
      {openDialogInspectItem && (
        <DialogInspectItem
          open={openDialogInspectItem}
          onClose={() => handleDialogInspectItem(true, itemToInspect!)}
          isArticle={true}
          item={itemToInspect!}
        />
      )}
    </div>
  );
};
