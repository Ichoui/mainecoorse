import React, { SyntheticEvent, useState } from 'react';
import { IconButton, Tab, Tabs, ThemeProvider } from '@mui/material';
import { CalendarMonthRounded, EditNoteRounded, FormatListBulletedRounded, RestaurantMenuRounded, ShoppingCartRounded, } from '@mui/icons-material';
import './app.scss';
import maple from '/logo.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '@styles/theme';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

export const App = (): JSX.Element => {
  const loc = useLocation();
  const location = () => {
    const pathname = loc.pathname.split('/')[1];
    if (pathname === 'articles' || pathname === 'calendar' || pathname === 'recettes') {
      return pathname.length ? pathname : 'articles';
    } else if (pathname === 'courses') {
      return false;
    } else {
      return 'articles';
    }
  };
  const [value, setValue] = useState<string | boolean>(location());
  const handleChangeTab = (event: SyntheticEvent, newValue: 'articles' | 'calendar' | 'recettes' | 'courses') =>
    setValue(newValue);

  return (
    <ThemeProvider theme={themeOptions}>
      {/* HEADER */}
      <header className='header' style={headerThemeColor}>
        <NavLink to='/notes' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setValue(false)}>
          <IconButton>
            <EditNoteRounded />
          </IconButton>
        </NavLink>

        <span className='logo'>
          <img src={maple} alt='Logo mainecoorse' />
        </span>

        <NavLink to='/courses' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setValue(false)}>
          <IconButton>
            <ShoppingCartRounded />
          </IconButton>
        </NavLink>
      </header>

      {/* CONTAINER + OUTLET ROUTAGE */}
      <section className='container' style={backgroundThemeColor}>
        <Outlet />
      </section>

      {/* TABS */}
      <Tabs
        value={value}
        onChange={handleChangeTab}
        textColor='primary'
        indicatorColor='primary'
        variant='fullWidth'
        className='Tabs'
        aria-label='menu tab'
        style={backgroundThemeColor}
      >
        <Tab
          value='articles'
          icon={<FormatListBulletedRounded />}
          iconPosition='top'
          label='Articles'
          component={Link}
          to='/articles'
        />
        <Tab
          value='calendar'
          icon={<CalendarMonthRounded />}
          iconPosition='top'
          label='Calendrier'
          component={Link}
          to='/calendar'
        />
        <Tab
          value='recettes'
          icon={<RestaurantMenuRounded />}
          iconPosition='top'
          label='Recette'
          component={Link}
          to='/recettes'
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default App;
