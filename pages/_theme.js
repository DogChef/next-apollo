import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import yellow from "@material-ui/core/colors/yellow";
import indigo from "@material-ui/core/colors/indigo";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: indigo["400"],
      main: indigo["500"],
      dark: indigo["700"]
    },
    secondary: {
      light: yellow["200"],
      main: yellow["500"],
      dark: yellow["700"]
    },
    error: {
      light: deepOrange["400"],
      main: deepOrange["600"],
      dark: deepOrange["800"]
    }
  },
  status: {
    danger: {
      light: deepOrange["400"],
      main: deepOrange["600"],
      dark: deepOrange["800"]
    }
  },
  overrides: {
    MuiAutocomplete: {
      inputRoot: {
        background: "white"
      }
    }
  }
});

export default theme;
