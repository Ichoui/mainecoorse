// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React from 'react';
import { Button, Fab, Tab, Tabs, ThemeProvider } from '@mui/material';
import { CalendarMonthRounded, FormatListBulletedRounded, RestaurantMenuRounded, ShoppingCartRounded } from '@mui/icons-material';
import './app.scss';
import maple from './maple.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '../styles/theme';

export function App(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <div className='layout'>
        {/* HEADER */}
        <header className='header' style={headerThemeColor}>
          <span className='logo'>
            <img src={maple} alt='Logo mainecoorse' />
          </span>

          <Fab >
            <ShoppingCartRounded />
          </Fab>
        </header>

        {/* CONTAINER + ROUTAGE */}
        <section className='container' style={backgroundThemeColor}>
          Contenu MAINECOORSE
          <Button className='cta'>CTA</Button>
        </section>

        {/* TABS */}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='primary'
          indicatorColor='primary'
          variant='fullWidth'
          className='Tabs'
          aria-label='menu tab'
          style={backgroundThemeColor}
        >
          <Tab icon={<FormatListBulletedRounded />} iconPosition='top' label='Items' />
          <Tab icon={<CalendarMonthRounded />} iconPosition='top' label='Calendrier' />
          <Tab icon={<RestaurantMenuRounded />} iconPosition='top' label='Recette' />
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
