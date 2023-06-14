import './item.scss';
import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AddShoppingCart, Delete, Edit, MoreVert } from '@mui/icons-material';
import { ItemArticles, ItemRecette } from '@shared-interfaces/items';

export const Item = (props: { item: ItemArticles | ItemRecette; isArticle: boolean }): JSX.Element => {
  const isArticle = props.isArticle; // For opening modal
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='item'>
      <Card variant='outlined'>

        {/* DATA*/}
        <CardActionArea>
          <CardContent className='itemContent'>
            <CardMedia component='img' alt={props.item.label} height='110' image={props.item.webImage} />
            <Typography className='typo' gutterBottom variant='h6' component='div'>
              {props.item.label}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* BUTTONS */}
        <CardActions className='itemActions'>
          <IconButton aria-label='add to courses' color='primary'>
            <AddShoppingCart />
          </IconButton>
          <div>
            <IconButton aria-label='see more' onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              id='more-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Delete /> Supprimer
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Edit /> Modifier
              </MenuItem>
            </Menu>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
