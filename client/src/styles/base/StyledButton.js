import React, { PropTypes } from "react";
import {
  tagMapping,
  fontSize,
  fontWeight,
  lineHeight,
  display
} from "../../styles/base/typography";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Colors } from "./Colors";

const styles = theme => ({
  button: {
    // minWidth: '200px',
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    borderRadius: 22,
    padding: "6px 12px",
    // border: '1px solid',
    // borderColor: '#007bff',
    // backgroundColor: '#210E5C',
    color: "#FFFF",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  primary: {
    backgroundColor: Colors.primary.main,
    "&:hover": {
      backgroundColor: "black",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  secondary: {
    backgroundColor: Colors.secondary.main,
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  },
  tertiary: {
    backgroundColor: Colors.tertiary.main,
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
});

function StyledButton(props) {
  const { children, type, className, variant, color, classes, onClick } = props;
  return (
    <Button
      variant={variant}
      type={type}
      className={classes.button + " " + classes[color] + " " + className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default withStyles(styles)(StyledButton);
