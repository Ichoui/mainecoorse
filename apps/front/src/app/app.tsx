// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { useState } from 'react';
import { Fab, Tab, Tabs, ThemeProvider } from '@mui/material';
import { CalendarMonthRounded, FormatListBulletedRounded, RestaurantMenuRounded, ShoppingCartRounded } from '@mui/icons-material';
import './app.scss';
import maple from './maple.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from "@styles/theme";
import { Link, Outlet } from 'react-router-dom';

export const App = (): JSX.Element => {
  const [value, setValue] = useState<string | boolean>('calendar');

  const handleChange = (event: React.SyntheticEvent, newValue: 'articles' | 'calendar' | 'recettes' | 'courses') => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={themeOptions}>

        {/* HEADER */}
        <header className='header' style={headerThemeColor}>
          <span className='logo'>
            <img src={maple} alt='Logo mainecoorse' />
          </span>

          <Fab component={Link} to='/courses' onClick={() => setValue(false)}>
            <ShoppingCartRounded />
          </Fab>
        </header>

        {/* CONTAINER + OUTLET ROUTAGE */}
        <section className='container' style={backgroundThemeColor}>
          <Outlet />
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
          <Tab value='articles' icon={<FormatListBulletedRounded />} iconPosition='top' label='Articles' component={Link} to='/articles' />
          <Tab value='calendar' icon={<CalendarMonthRounded />} iconPosition='top' label='Calendrier' component={Link} to='/calendar' />
          <Tab value='recettes' icon={<RestaurantMenuRounded />} iconPosition='top' label='Recette' component={Link} to='/recettes' />
        </Tabs>
    </ThemeProvider>
  );
};

export default App;
