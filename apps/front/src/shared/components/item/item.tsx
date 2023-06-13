import './item.scss';
import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { AddShoppingCart, MoreVert, SavedSearch } from '@mui/icons-material';
import { ItemArticles, ItemRecette } from "@app/articles/articles";

export const Item = (props: { item: ItemRecette | ItemArticles; isArticle: boolean }): JSX.Element => {
  const isArticle = props.isArticle;

  return (
    <div className='item'>
      <Card variant='outlined'>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreVert />
            </IconButton>
          }
          title={props.item.label}
          className="itemHeader"
        />

        <CardContent className='itemContent'>
          <img src={props.item.webImage} alt={props.item.label} />
        </CardContent>

        <CardActions className='itemActions'>
          <Button size='small'>
            <SavedSearch />
          </Button>
          <Button size='small'>
            <AddShoppingCart />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
