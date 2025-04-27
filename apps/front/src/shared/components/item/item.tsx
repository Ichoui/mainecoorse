import './item.scss';
import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { AddShoppingCartRounded, DeleteRounded, EditRounded, MoreVertRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DialogConfirmation } from '@components/dialogs/dialog-confirmation/dialog-confirmation';
import { DialogInspectItem } from '@components/dialogs/dialog-inspect-item/dialog-inspect-item';
import { ItemBase, ItemType } from '@shared-interfaces/items';
import { DialogAddCalendar } from '@components/dialogs/dialog-add-calendar/dialog-add-calendar';
import { SnackbarContext } from '@app/app';
import { configAxios } from '@shared/hooks/axios.config';
import { urlTest } from '@shared/utils/url.utils';
import { LoaderThree } from '@shared/svg/loader-three';

export const Item = (props: { item: ItemBase; itemRemoved: () => void }): React.JSX.Element => {
  const { item, itemRemoved } = props;
  const isArticle = item.itemType === ItemType.ARTICLE;
  const urlToRoute = `/${isArticle ? 'article' : 'recette'}/${item.id}`;
  const { setSnackValues } = useContext(SnackbarContext);

  // eslint-disable-next-line no-empty-pattern
  const [{}, removeItem] = configAxios({
    url: isArticle ? 'articles' : 'recettes',
    method: 'DELETE',
    manual: true,
    params: { id: item?.id },
  });

  // Anchor Element to attach mini menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMiniMenu = Boolean(anchorEl);
  const handleMiniMenu = (event?: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event?.currentTarget ?? null);

  // Dialog supression Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, remove?: boolean) => {
    setOpenDialogConfirmation(open);
    if (remove) {
      removeItem()
        .then(() => {
          setSnackValues({
            open: true,
            message: `👽 ${isArticle ? 'Article' : 'Recette'} supprimé`,
            severity: 'success',
          });
          itemRemoved();
        })
        .catch(error => {
          setSnackValues({
            open: true,
            error,
            severity: 'error',
          });
        });
    }
  };

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const handleDialogInspectItem = (open = false) => setOpenDialogInspectItem(open);

  // Dialog add to calendar and/or courses
  const [openDialogAddTo, setOpenDialogAddTo] = useState(false);
  const handleDialogAddTo = (open = false) => setOpenDialogAddTo(open);

  const [itemUrl, setItemUrl] = useState({ url: '', pending: true, typeUrl: '' });
  useEffect(() => {
    urlTest(item?.url).then(res => setItemUrl({ url: res.url, pending: false, typeUrl: res.typeUrl }));
  }, [item?.url, setItemUrl]);


  return (
    <div className='item' id={item.label}>
      <Card variant='outlined'>
        {/* DATA*/}
        <CardActionArea onClick={() => handleDialogInspectItem(true)}>
          <CardContent className='itemContent'>
            {!itemUrl?.pending && (
              <CardMedia
                component='img'
                alt={item.label}
                height='110'
                image={itemUrl?.url}
                className={itemUrl?.typeUrl}
                style={isArticle ? {width: 'auto'} : {width: '-webkit-fill-available'}}
              />
            )}
            {itemUrl?.pending && (
              <div className='isLoadingImage'>
                <LoaderThree />
              </div>
            )}
            <Typography className='typo' gutterBottom variant='h6' component='div'>
              {item.label}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* BUTTONS */}
        <CardActions className='itemActions'>
          <IconButton aria-label='add to courses' color='secondary' onClick={() => handleDialogAddTo(true)}>
            <AddShoppingCartRounded />
          </IconButton>
          <div>
            <IconButton aria-label='see more' onClick={e => handleMiniMenu(e)}>
              <MoreVertRounded />
            </IconButton>
            <Menu
              id='more-menu'
              anchorEl={anchorEl}
              open={openMiniMenu}
              onClose={() => handleMiniMenu()}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMiniMenu();
                  handleDialogConfirmation(true);
                }}
              >
                <Typography className='typo-mini-menu' color='error'>
                  <DeleteRounded /> <span>Supprimer</span>
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => handleMiniMenu} component={Link} to={urlToRoute} state={item}>
                <Typography className='typo-mini-menu'>
                  <EditRounded /> <span>Modifier</span>
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </CardActions>
      </Card>

      {/*OPEN DIALOG TO CONFIRM DELETE */}
      {openDialogConfirmation && (
        <DialogConfirmation
          open={openDialogConfirmation}
          isArticle={isArticle}
          onClose={removeItem => handleDialogConfirmation(false, removeItem)}
        />
      )}

      {/*OPEN DIALOG TON INSPECT ITEM IN READONLY*/}
      {openDialogInspectItem && (
        <DialogInspectItem
          open={openDialogInspectItem}
          onClose={handleDialogInspectItem}
          isArticle={isArticle}
          item={item}
        />
      )}
      {openDialogAddTo && (
        <DialogAddCalendar open={openDialogAddTo} onClose={handleDialogAddTo} isArticle={isArticle} item={item} />
      )}
    </div>
  );
};
