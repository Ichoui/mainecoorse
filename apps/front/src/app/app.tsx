// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React, { SyntheticEvent, useState } from 'react';
import { Fab, IconButton, Tab, Tabs, ThemeProvider } from '@mui/material';
import {
  CalendarMonthRounded,
  FormatListBulletedRounded,
  RestaurantMenuRounded,
  ShoppingCartRounded,
  TagRounded
} from "@mui/icons-material";
import './app.scss';
import maple from './maple.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '@styles/theme';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const App = (): JSX.Element => {
  const loc = useLocation();
  const location = () => {
    const pathname = loc.pathname.split('/')[1];
    if (pathname === 'articles' || pathname === 'calendar' || pathname === 'recettes') {
      return pathname.length ? pathname : 'articles';
    } else if (pathname === 'courses') {
      return false;
    } else {
      return 'articles'
    }
  };
  const [value, setValue] = useState<string | boolean>(location());
  const handleChange = (event: SyntheticEvent, newValue: 'articles' | 'calendar' | 'recettes' | 'courses') => setValue(newValue);

  return (
    <ThemeProvider theme={themeOptions}>
      {/* HEADER */}
      <header className='header' style={headerThemeColor}>
        <IconButton component={Link} to='/tags' onClick={() => setValue(false)}>
          <TagRounded />
        </IconButton>

        <span className='logo'>
          <img src={maple} alt='Logo mainecoorse' />
        </span>

        <IconButton component={Link} to='/courses' onClick={() => setValue(false)}>
          <ShoppingCartRounded />
        </IconButton>
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
