import { createTheme, ThemeOptions } from '@mui/material/styles';
import './shared.scss';
import { SimplePaletteColorOptions } from "@mui/material/styles/createPalette";

// https://zenoo.github.io/mui-theme-creator/#Switch
export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00897b',
      light: '#33A095',
      dark: '#005F56',
    },
    secondary: {
      main: '#f50057',
      light: '#F73378',
      dark: '#AB003C',
    },
    background: {
      default: '#1b1d21',
      paper: '#1b1d21',
    },
    text: {
      secondary: '#9a9c9e',
      primary: '#d0d2d4',
      disabled: 'rgba(0,0,0,0.5)',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export const backgroundThemeColor = { backgroundColor: themeOptions?.palette?.background?.default };
export const headerThemeColor = { backgroundColor: (themeOptions?.palette?.primary as SimplePaletteColorOptions)?.main };
