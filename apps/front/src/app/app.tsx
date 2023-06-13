// eslint-disable-next-line @typescript-eslint/no-unused-vars

import React from 'react';
import { Button, Fab, Tab, Tabs, ThemeProvider } from '@mui/material';
import { CalendarMonthRounded, FormatListBulletedRounded, RestaurantMenuRounded, ShoppingCartRounded } from '@mui/icons-material';
import './app.scss';
import maple from './maple.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '../styles/theme';
import { Link, Outlet } from "react-router-dom";

export function App(): JSX.Element {
  const [value, setValue] = React.useState('calendar');

  const handleChange = (event: React.SyntheticEvent, newValue: 'items' | 'calendar' | 'recettes' | 'courses') => {
    console.log(newValue);
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

          <Fab component={Link} to='/courses'>
            <ShoppingCartRounded />
          </Fab>
        </header>

        {/* CONTAINER + ROUTAGE */}
        <section className='container' style={backgroundThemeColor}>
          Contenu MAINECOORSE
          <Button className='cta'>CTA</Button>
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
          <Tab value='items' icon={<FormatListBulletedRounded />} iconPosition='top' label='Items' component={Link} to='/items' />
          <Tab value='calendar' icon={<CalendarMonthRounded />} iconPosition='top' label='Calendrier' component={Link} to='/calendar'/>
          <Tab value='recettes' icon={<RestaurantMenuRounded />} iconPosition='top' label='Recette' component={Link} to='/recettes'/>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
