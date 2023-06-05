import { green, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ED",
    },
    secondary: {
      main: "#536dfe",
    },
    error: {
      main: red[500],
    },
    success: {
      main: green[600],
    },
    background: {
      default: grey[50],
    },
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
});

export default theme;
