import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ResponseHandler from "./Components/responseHandler/ResponseHandler";
import Homepage from "./Components/Homepage/index";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#56E39F",
      contrastText: "#000",
    },
    secondary: {
      main: "#A18276",
    },
    error: {
      main: "#ff0000",
    },
    background: {
      default: "#fff",
    },
  },
  spacing: 10,
  props: {
    Slide: {
      direction: "up",
    },
    MuiAppBar: {
      color: "inherit",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
      disableFocusRipple: true,
    },
    MuiCheckbox: {
      disableRipple: true,
      disableFocusRipple: true,
    },
    MuiTextField: {
      variant: "outlined",
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiInputLabel: {
      shrink: true,
    },
    MuiInput: {
      variant: "contained",
    },
    MuiPaper: {
      elevation: 10,
    },
    MuiCard: {
      elevation: 10,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
  shape: {
    borderRadius: 7,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Homepage />
      <ResponseHandler />
    </MuiThemeProvider>
  );
}

export default App;
