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
import { ItemArticles, ItemRecette } from '@shared-interfaces/items';
import { Link } from 'react-router-dom';
import { DialogConfirmation } from '@components/dialog-confirmation/dialog-confirmation';

export const Item = (props: { item: ItemArticles | ItemRecette; isArticle: boolean }): JSX.Element => {
  const { item, isArticle } = props;
  const urlToRoute = `/${isArticle ? 'article' : 'recette'}/id`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMiniMenu = Boolean(anchorEl);
  const handleMiniMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget ?? null);
  };

  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const handleOpenDialogConfirmation = () => {
    setOpenDialogConfirmation(true);
  };

  const handleCloseDialogConfirmation = (removeItem?: boolean) => {
    setOpenDialogConfirmation(false);
    if (removeItem) {
      // ICI, gérer la suppression via API de l'item via son ID
    }
  };

  return (
    <div className='item'>
      <Card variant='outlined'>
        {/* DATA*/}
        <CardActionArea>
          <CardContent className='itemContent'>
            <CardMedia component='img' alt={item.label} height='110' image={item.webImage} />
            <Typography className='typo' gutterBottom variant='h6' component='div'>
              {item.label}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* BUTTONS */}
        <CardActions className='itemActions'>
          <IconButton aria-label='add to courses' color='primary'>
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
                  handleOpenDialogConfirmation();
                }}
              >
                <DeleteRounded /> Supprimer
              </MenuItem>
              <MenuItem onClick={() => handleMiniMenu} component={Link} to={urlToRoute}>
                <EditRounded /> Modifier
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
          onClose={handleCloseDialogConfirmation}
        />
      )}
    </div>
  );
};
