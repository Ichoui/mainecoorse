import './editArticle.scss';
import { Params, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { DeleteForeverRounded, SaveAsRounded } from '@mui/icons-material';

export const EditArticle = (): JSX.Element => {
  const { articleId }: Readonly<Params<string>> = useParams();
  let isNewArticle = false;
  if (articleId === 'new') {
    isNewArticle = true;
  }

  return (
    <div className='editArticle'>
      <div className='image'>
        <span style={{ backgroundImage: "url('https://img.cuisineaz.com/660x660/2013/12/20/i47006-raclette.jpeg')" }}></span>
      </div>
      <TextField id='name' label='Nom' placeholder='Roquefort' type='text' variant='outlined' />
      <TextField id='url' label='URL Image' placeholder='https://la-raclette-cest-la-vie.brie' type='text' variant='outlined' />
      <TextField id='description' label='Description' placeholder="Le Munster, c'est la vie... 🙃" variant='outlined' rows={4} multiline />

      <div className='actions'>
        <Button variant='outlined' color='error' startIcon={<DeleteForeverRounded />}>
          Supprimer
        </Button>
        <Button variant='outlined' color='primary' startIcon={<SaveAsRounded />}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
};
