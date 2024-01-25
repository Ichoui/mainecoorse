import React, { createContext, SyntheticEvent, useEffect, useState } from 'react';
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
import skyrimTroll from '/skyrim.mp3';
import occitan from '/flags/croix-occitane.png';
import lys from '/flags/fleur-de-lys.png';
import { backgroundThemeColor, headerThemeColor, themeOptions } from '@styles/theme';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SnackbarPortal } from '@components/snackbarPortal/snackbarPortal';
import { ISnackbar } from '@shared-interfaces/items';
import { configAxios } from '@shared/hooks/axios.config';
import { PingBounce } from '@components/loaders/ping-bounce/ping-bounce';

type SnackDefaultValue = {
  snackValues: ISnackbar;
  setSnackValues: React.Dispatch<React.SetStateAction<ISnackbar>>;
};
export const SnackbarContext = createContext<SnackDefaultValue>({
  snackValues: { open: false },
  setSnackValues: () => {
    /*Init*/
  },
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
  const [skyrim, setSkyrim] = useState<boolean>(true);
  const [value, setValue] = useState<string | boolean>(location());
  const handleChangeTab = (event: SyntheticEvent, newValue: 'articles' | 'calendar' | 'recettes' | 'courses') =>
    setValue(newValue);

  const [snackValues, setSnackValues] = useState<ISnackbar>({ open: false });

  const [{}, fetchPing] = configAxios({ method: 'GET', url: 'ping', manual: true });
  // const [{}, getFlag] = configAxios({ method: 'GET', url: 'settings/flags', manual: true });

  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (!appReady) {
      // Permet principalement l'attente que la fonction firebase soit chaude
      // On attend que l'application soit ready pour affichier l'application
      timer = setInterval(() => {
        fetchPing().then(() => setAppReady(true));
      }, 2500);
    }

    // Rafraîchissez le timeout lors du nettoyage.
    return () => {
      clearInterval(timer);
    };
  }, [fetchPing, setAppReady, appReady]);

  return (
    <ThemeProvider theme={themeOptions}>
      {/* HEADER */}
      <header className='header' style={headerThemeColor}>
        <NavLink to='/notes' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setValue(false)}>
          <IconButton>
            <EditNoteRounded />
          </IconButton>
        </NavLink>

        <span className='logo' onClick={() => setSkyrim(!skyrim)}>
          {skyrim && (
            <div style={{ display: 'none' }}>
              <audio autoPlay={true}>
                <source src={skyrimTroll} type='audio/mp3' />
              </audio>
            </div>
          )}
          <img src={maple} alt='Logo mainecoorse' />
          <img className='bouffe lys' src={lys} alt='fleur de lys' />
          <img className='bouffe occitan' src={occitan} alt='croix occitane' />
        </span>

        <NavLink to='/courses' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setValue(false)}>
          <IconButton>
            <ShoppingCartRounded />
          </IconButton>
        </NavLink>
      </header>

      {/* CONTAINER + OUTLET ROUTAGE */}
      <section className='container' style={backgroundThemeColor}>
        {!appReady && <PingBounce />}

        {/*https://stackoverflow.com/questions/65256599/how-to-make-snackbar-a-global-component-withcontext*/}
        {appReady && (
          <SnackbarContext.Provider value={{ snackValues, setSnackValues }}>
            <Outlet />
            <SnackbarPortal snackValues={snackValues} closeSnackbar={() => setSnackValues({ open: false })} />
          </SnackbarContext.Provider>
        )}
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
