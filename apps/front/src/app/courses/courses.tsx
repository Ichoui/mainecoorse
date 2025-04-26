import './courses.scss';
import { ArticleTags, CoursesArticleList } from '@shared-interfaces/items';
import { Button, FormGroup } from '@mui/material';
import { Coches } from '@app/courses/coches/coches';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Loader } from '@components/loaders/loader/loader';
import { DataError } from '@components/data-error/data-error';
import { configAxios } from '@shared/hooks/axios.config';
import { SnackbarContext } from '@app/app';
import { Tumbleweed } from '@app/courses/tumbleweed/tumbleweed';
import { doc, setDoc, getFirestore, onSnapshot } from 'firebase/firestore';

export const Courses = () => {
  const [itemsSortedByTags, setItemsSorted] = useState<(string | CoursesArticleList[])[]>([]);
  const [{ data, error, loading: loadingGet }, fetchCourses] = configAxios({
    url: 'courses',
    method: 'GET',
    autoCancel: false,
  });
  const { setSnackValues } = useContext(SnackbarContext);
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePutQuantity] = configAxios({ method: 'PUT', manual: true });
  // eslint-disable-next-line no-empty-pattern
  const [{}, executePurge] = configAxios({ url: 'courses', method: 'DELETE', manual: true });

  /* Listen to any change in firestore to use websocket firebase techno */
  useEffect(() => {
    const db = getFirestore();
    onSnapshot(doc(db, 'websocket', import.meta.env.DEV ? 'io.dev' : 'io'), doc => {
      if (!doc.metadata.hasPendingWrites) {
        fetchCourses().then(e => setItemsSorted(sortByTags(e.data)));
      }
    });
  }, [fetchCourses]);

  useEffect(() => {
    setItemsSorted(sortByTags(data));
  }, [data, loadingGet, error]);

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, purge?: boolean) => {
    setOpenDialogConfirmation(open);
    if (purge) {
      executePurge()
        .then(res => setItemsSorted(sortByTags(res.data)))
        .then(() => cocheChanged())
        .then(() => setSnackValues({ open: true, message: '♻️ Purgatoire en cours...', severity: 'success' }))
        .catch(error => setSnackValues({ open: true, error, severity: 'error' }));
    }
  };

  /* Emit new value to firebase */
  const cocheChanged = () => {
    const db = getFirestore();
    setDoc(doc(db, 'websocket', import.meta.env.DEV ? 'io.dev' : 'io'), {
      date: new Date(),
    });
  };

  return (
    <div className='Courses'>
      {loadingGet && <Loader />}
      {error && <DataError />}

      {!loadingGet && !error && (
        <Fragment>
          {itemsSortedByTags.length === 0 && <Tumbleweed />}
          {itemsSortedByTags.length > 0 && (
            <Fragment>
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
                          cocheChanged={cocheChanged}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </FormGroup>
              <div className='btn-purge'>
                <Button type='button' color='error' variant='outlined' onClick={() => handleDialogConfirmation(true)}>
                  Purger
                </Button>
              </div>
            </Fragment>
          )}
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
