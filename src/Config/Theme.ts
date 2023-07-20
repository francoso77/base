import { createTheme } from "@mui/material";
import { pink, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: pink[200],
    },
    secondary: {
      main: red[500],
    },
  },
})

// export const theme = {
//   colors: {
//     primaryColor: '#0A1128',
//     secondaryColor: '#dc143c',
//     white: '#FFFFFF',
//     mediumGray: '#DDDDDD',
//   },

//   font: {
//     family: {
//       default: "'Open Sans', sans-serif",
//       secondary: "'Montserrat', sans-serif",
//     },
//     sizes: {
//       xsmall: '0.8rem',
//       small: '1.6rem',
//       medium: '2.4rem',
//       large: '3.2rem',
//       xlarge: '4.0rem',
//       xxlarge: '4.8rem',
//       huge: '5.6rem',
//       xhuge: '6.4rem',
//     },
//   },

//   media: {
//     lteMedium: '(max-width: 768px)',
//   },

//   spacings: {
//     xsmall: '0.8rem',
//     small: '1.6rem',
//     medium: '2.4rem',
//     large: '3.2rem',
//     xlarge: '4.0rem',
//     xxlarge: '4.8rem',
//     huge: '5.6rem',
//     xhuge: '6.4rem',
//   },
// };