import './item.scss';
import React, { useState } from 'react';
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

export const Item = (props: { item: ItemBase }): JSX.Element => {
  const { item } = props;
  const isArticle = item.itemType === ItemType.ARTICLE;
  const urlToRoute = `/${isArticle ? 'article' : 'recette'}/${item.id}`;

  // Anchor Element to attach mini menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMiniMenu = Boolean(anchorEl);
  const handleMiniMenu = (event?: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event?.currentTarget ?? null);

  // Dialog Confirmation
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleDialogConfirmation = (open = false, removeItem?: boolean) => {
    setOpenDialogConfirmation(open);
    if (removeItem) {
      // ICI, gérer la suppression via API de l'item via son ID
    }
  };

  // Dialog inspect item
  const [openDialogInspectItem, setOpenDialogInspectItem] = useState(false);
  const handleDialogInspectItem = (open = false) => setOpenDialogInspectItem(open);

  // Dialog add to calendar and/or courses
  const [openDialogAddTo, setOpenDialogAddTo] = useState(false);
  const handleDialogAddTo = (open = false) => setOpenDialogAddTo(open);

  return (
    <div className='item'>
      <Card variant='outlined'>
        {/* DATA*/}
        <CardActionArea onClick={() => handleDialogInspectItem(true)}>
          <CardContent className='itemContent'>
            <CardMedia component='img' alt={item.label} height='110' image={item.url} />
            <Typography className='typo' gutterBottom variant='h6' component='div'>
              {item.label}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* BUTTONS */}
        <CardActions className='itemActions'>
          <IconButton aria-label='add to courses' color='primary' onClick={() => handleDialogAddTo(true)}>
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
              <MenuItem onClick={() => handleMiniMenu} component={Link} to={urlToRoute}>
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
