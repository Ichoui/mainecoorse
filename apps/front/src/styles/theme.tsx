import './shared.scss';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { yellow } from '@mui/material/colors';

// https://zenoo.github.io/mui-theme-creator/#Switch
// https://mui.com/material-ui/customization/color/

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9570de',
    },
    secondary: {
      main: yellow[500],
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
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: 'Oswald-Bold',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1b1d21',
          backgroundImage: 'inherit'
        },
      },
    },
  },
});

export const backgroundThemeColor = { backgroundColor: themeOptions?.palette?.background?.default };
export const headerThemeColor = {
  backgroundColor: (themeOptions?.palette?.primary as SimplePaletteColorOptions)?.dark,
};
