import './courses.scss';
import { ArticleTags, CoursesArticleList } from '@shared-interfaces/items';
import { Button, FormGroup } from '@mui/material';
import { Coches } from '@app/courses/coches/coches';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Loader } from '@components/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { configAxios } from '@shared/hooks/axios.config';
import { SnackbarContext } from '@app/app';

export const Courses = () => {
  const [itemsSortedByTags, setItemsSorted] = useState<(string | CoursesArticleList[])[]>([]);
  const [{ data, error, loading: loadingGet }] = configAxios({ url: 'courses', method: 'GET', autoCancel: false });
  const { setSnackValues } = useContext(SnackbarContext);
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePutQuantity] = configAxios({ method: 'PUT', manual: true });
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePutPurchased] = configAxios({ method: 'PUT', manual: true });
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePurge] = configAxios({ url: 'courses', method: 'DELETE', manual: true });

  useEffect(() => {
    setItemsSorted(sortByTags(data));
  }, [data, loadingGet, error]);

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, purge?: boolean) => {
    setOpenDialogConfirmation(open);
    if (purge) {
      // executePurge()
      // .then(() => setSnackValues({ open: true, message: '🤠 Hiiii-haaaa', severity: 'success', autoHideDuration: 1000 }))
      // .catch(() => setSnackValues({ open: true, message: '😨 Erreur !', severity: 'error', autoHideDuration: 1000 }));
      // TODO Purger les courses avec les ID en body + queryParam
    }
  };

  return (
    <div className='Courses'>
      {loadingGet && <Loader />}
      {error && <DataError />}

      {!loadingGet && !error && (
        <Fragment>
          <div className='btn-purge'>
            <Button type='button' color='error' variant='outlined' onClick={() => handleDialogConfirmation(true)}>
              Purger
            </Button>
          </div>
          <FormGroup>
            {itemsSortedByTags?.map((items: CoursesArticleList[] | string, index: number) => (
              <div key={index} className='blocks'>
                {<h3>{items[0] as string}</h3>}
                <hr />
                <div className='container-checkboxes'>
                  {(items[1] as unknown as CoursesArticleList[]).map((item, itemIndex) => (
                    <Coches
                      key={itemIndex}
                      item={item}
                      setSnackValues={setSnackValues}
                      executePut={executePutQuantity}
                    ></Coches>
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

const sortByTags = (items: CoursesArticleList[]): (string | CoursesArticleList[])[] => {
  const extractAllTags = items?.map(item => item.tags[0]);
  const tags = extractAllTags?.filter((value, index) => extractAllTags.indexOf(value) === index);
  const sortedItems: Record<ArticleTags, CoursesArticleList[]> | NonNullable<unknown> = {};
  // @ts-ignore
  tags?.map(t => (sortedItems[t] = []));
  items?.map(item => {
    const tag = item.tags[0];
    // @ts-ignore
    return sortedItems[tag].push(item);
  });

  // @ts-ignore
  return Object.keys(sortedItems).map(key => [key, sortedItems[key]]);
};
