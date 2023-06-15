import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: { paper: "#fff", default: "#f2f5f9" },
    primary: {
      light: "rgba(85, 155, 87, 1)",
      main: "rgba(35, 37, 123, 1)",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "rgba(94, 84, 142, 1)",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: {
      primary: "rgba(34, 51, 84, 1)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  gradients: {
    blue: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    purple: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    orange1: "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)",
    orange2: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)",
  },
});

export default theme;
