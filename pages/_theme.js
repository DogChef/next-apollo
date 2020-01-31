import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import teal from "@material-ui/core/colors/teal";
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
      light: teal["200"],
      main: teal["500"],
      dark: teal["700"]
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
  }
});

export default theme;
