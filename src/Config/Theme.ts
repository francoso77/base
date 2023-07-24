import { createTheme } from "@mui/material";

export const THEME = createTheme({
  menu: {
    corIcone: '#0f2770',
    tamanhoIcone: 40
  },
  palette: {
    primary: {
      main: '#0f2770'
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