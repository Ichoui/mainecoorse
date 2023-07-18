import './courses.scss';
import { ArticleList, ArticleTags } from '@shared-interfaces/items';
import { Button, FormGroup } from '@mui/material';
import { Coches } from '@app/courses/coches/coches';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import React, { Fragment, useEffect, useState } from 'react';
import { useAxios } from '@shared/hooks/useAxios.hook';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';

export const Courses = () => {
  const [itemsSortedByTags, setItemsSorted] = useState<(string | ArticleList[])[]>([]);
  const { data, error, loaded } = useAxios('courses', 'GET');

  useEffect(() => {
    setItemsSorted(sortByTags(data));
  }, [data]);

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
      {!loaded && <Loader />}
      {error && <DataError />}

      {loaded && !error && (
        <Fragment>
          <div className='btn-purge'>
            <Button type='button' color='error' variant='outlined' onClick={() => handleDialogConfirmation(true)}>
              Purger
            </Button>
          </div>
          <FormGroup>
            {itemsSortedByTags?.map((items: ArticleList[] | string, index: number) => (
              <div key={index} className='blocks'>
                {<h3>{items[0] as string}</h3>}
                <hr />
                <div className='container-checkboxes'>
                  {(items[1] as unknown as ArticleList[]).map((item, itemIndex) => (
                    <Coches key={itemIndex} item={item}></Coches>
                  ))}
                </div>
              </div>
            ))}
          </FormGroup>
        </Fragment>
      )}
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

const sortByTags = (items: ArticleList[]): (string | ArticleList[])[] => {
  const extractAllTags = items?.map(item => item.tags[0] as ArticleTags);
  const tags = extractAllTags?.filter((value, index) => extractAllTags.indexOf(value) === index);
  const sortedItems: Record<ArticleTags, ArticleList[]> | NonNullable<unknown> = {};
  // @ts-ignore
  tags?.map(t => (sortedItems[t] = []));
  items?.map(item => {
    const tag = item.tags[0];
    // @ts-ignore
    return sortedItems[tag].push(item); // TODO return à retirer ou pas ? :grimace:
  });

  // @ts-ignore
  return Object.keys(sortedItems).map(key => [key, sortedItems[key]]);
};
