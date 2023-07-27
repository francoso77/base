import { createTheme } from "@mui/material";

export const THEME = createTheme({
  menu: {
    corIcone: '#e15244',
    tamanhoIcone: 40
  },
  palette: {
    primary: {
      main: '#e15244'
    }
  }
});

declare module '@mui/material/styles' {
  interface Theme {
    menu: {
      corIcone: string;
      tamanhoIcone: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    menu?: {
      corIcone?: string;
      tamanhoIcone?: number;
    };
  }
}