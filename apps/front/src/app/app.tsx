import React, { createContext, SyntheticEvent, useState } from 'react';
import { IconButton, Tab, Tabs, ThemeProvider } from '@mui/material';
import {
  CalendarMonthRounded,
  EditNoteRounded,
  FormatListBulletedRounded,
  RestaurantMenuRounded,
  ShoppingCartRounded,
} from '@mui/icons-material';
import './app.scss';
import maple from '/logo.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '@styles/theme';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SnackbarPortal } from '@components/snackbarPortal/snackbarPortal';
import { ISnackbar } from '@shared-interfaces/items';

type SnackDefaultValue = {
  snackValues: ISnackbar;
  setSnackValues: React.Dispatch<React.SetStateAction<ISnackbar>>;
};
export const SnackbarContext = createContext<SnackDefaultValue>({
  snackValues: { open: false },
  setSnackValues: () => { /*Init*/},
});

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

  const [snackValues, setSnackValues] = useState<ISnackbar>({ open: false });

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
        {/*https://stackoverflow.com/questions/65256599/how-to-make-snackbar-a-global-component-withcontext*/}
        <SnackbarContext.Provider value={{ snackValues, setSnackValues }}>
          <Outlet />
          <SnackbarPortal snackValues={snackValues} closeSnackbar={() => setSnackValues({ open: false })} />
        </SnackbarContext.Provider>
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
          label='Recettes'
          component={Link}
          to='/recettes'
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default App;
