import './courses.scss';
import { ArticleList, ArticleTags } from '@shared-interfaces/items';
import { Button, FormGroup } from '@mui/material';
import { Coches } from '@app/courses/coches/coches';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import React, { useState } from 'react';

export const Courses = () => {
  const items: ArticleList[] = [
    {
      id: 1,
      label: 'Article 1',
      quantity: 7,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.EPICERIE],
    },
    {
      id: 3,
      label: 'Article 2',
      quantity: 7,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.ENTRETIEN],
    },
    {
      id: 4,
      label: 'Article 3',
      quantity: 7,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.ENTRETIEN],
    },
    {
      id: 5,
      label: 'Article 4',
      quantity: 7,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS],
    },
    {
      id: 8,
      label: 'Article 16',
      quantity: 7,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.EPICERIE],
    },
  ];

  const ItemsSortedByTags: (string | ArticleList[])[] = SortByTags(items);

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, purge?: boolean) => {
    setOpenDialogConfirmation(open);
    if (purge) {
      // TODO Purger les courses avec les ID
    }
  };

  return (
    <div className='Courses'>
      <div className='btn-purge'>

      <Button type='button' variant='outlined' onClick={() => handleDialogConfirmation(true)}>Purger</Button>
      </div>
      <FormGroup>
        {ItemsSortedByTags.map((items: ArticleList[] | string, index: number) => (
          <div key={index} className='blocks'>
            {<h2>{items[0] as string}</h2>}
            <hr />
            <div className='container-checkboxes'>
              {(items[1] as unknown as ArticleList[]).map((item, itemIndex) => (
                <Coches item={item}></Coches>
              ))}
            </div>
          </div>
        ))}
      </FormGroup>


      {/*OPEN DIALOG TO CONFIRM DELETE */}
      {openDialogConfirmation && (
        <DialogConfirmation
          open={openDialogConfirmation}
          purge={true}
          onClose={purge => handleDialogConfirmation(false, purge)}
        />
      )}
    </div>
  );
};

const SortByTags = (items: ArticleList[]): (string | ArticleList[])[] => {
  const extractAllTags = items.map(item => item.tags[0] as ArticleTags);
  const tags = extractAllTags.filter((value, index) => extractAllTags.indexOf(value) === index);
  const sortedItems: Record<ArticleTags, ArticleList[]> | {} = {};
  // @ts-ignore
  tags.map(t => (sortedItems[t] = []));
  items.map(item => {
    const tag = item.tags[0];
    // @ts-ignore
    sortedItems[tag].push(item);
  });

  // @ts-ignore
  return Object.keys(sortedItems).map(key => [key, sortedItems[key]]);
};
