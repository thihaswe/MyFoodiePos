import { lime, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4C4C6D",
    },
    secondary: {
      main: "#FFE194",
    },
    info: {
      main: "#E8F6EF",
    },
    success: {
      main: "#1B9C85",
    },
    error: {
      main: "#FF0000",
      light: "#00FF00",
    },
  },
});
