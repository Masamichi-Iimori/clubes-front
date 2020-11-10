import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3BDCC9', // 基本の色よりも明るい色
      main: '#1B998B', // 基本の色
      dark: '#136C61', // 基本の色よりも暗い色
      contrastText: '#fff', // テキストの色
    },
    secondary: {
      light: '#90A9D4',
      main: '#6C8DC8',
      dark: '#4670B8',
      contrastText: '#fff',
    },
  },
});