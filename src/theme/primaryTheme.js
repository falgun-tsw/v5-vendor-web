import React from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#2B70C5",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontSize: "3.938rem",
      letterSpacing: "0em",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.313rem",
      letterSpacing: "-0.043em",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "2.375rem",
      letterSpacing: "-0.043em",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.375rem",
      letterSpacing: "-0.016em",
      fontWeight: "bold",
    },
    button: {
      fontSize: "1.125rem",
      fontWeight: 300,
      letterSpacing: "0em",
    },
    subtitle1: {
      fontSize: "1.375rem",
      letterSpacing: "-0.011em",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: "1.25rem",
      letterSpacing: "-0.011em",
    },
    body1: {
      fontSize: "1.125rem",
      letterSpacing: "-0.013em",
    },
    body2: {
      fontSize: "1rem",
      letterSpacing: "-0.011em",
    },
    small: {
      fontSize: "0.875rem",
      letterSpacing: "-0.011em",
    },
    caption1: {
      fontSize: "0.75rem",
      letterSpacing: "-0.011em",
    },
    caption2: {
      fontSize: "0.625rem",
      letterSpacing: "-0.011em",
    },
    white: {
      fontSize: "1rem",
      letterSpacing: "-0.011em",
      opacity: 0.8,
      color: "white",
    },
  },
};

let theme = createTheme(themeOptions);

// responsive theme size
theme = responsiveFontSizes(theme, {
    variants: ["body2", "subtitle2"]
});

const PrimaryTheme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default PrimaryTheme;
