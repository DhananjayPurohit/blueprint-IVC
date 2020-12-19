import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        IVC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginLeft:"80%"
  }
}));

export default function Checkout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            How it works?
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.button}
            href="/"
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Transcript
          </Typography>
          <br />
          <Typography align="justified">
            An integrated circuit or monolithic integrated circuit (also
            referred to as an IC, a chip, or a microchip) is a set of electronic
            circuits on one small flat piece (or "chip") of semiconductor
            material that is normally silicon. The integration of large numbers
            of tiny MOS transistors into a small chip results in circuits that
            are orders of magnitude smaller, faster, and less expensive than
            those constructed of discrete electronic components. The IC's mass
            production capability, reliability, and building-block approach to
            integrated circuit design has ensured the rapid adoption of
            standardized ICs in place of designs using discrete transistors. ICs
            are now used in virtually all electronic equipment and have
            revolutionized the world of electronics. Computers, mobile phones,
            and other digital home appliances are now inextricable parts of the
            structure of modern societies, made possible by the small size and
            low cost of ICs.
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Questions
          </Typography>
          <br />
          <Typography align="justified">
            The integration of large numbers of tiny MOS transistors into a
            large chip results in circuits that are orders of magnitude largeer,
            faster, and less expensive than those constructed of discrete
            electronic components.
            <br />
            <br />
            True
            <br />
            False
          </Typography>
          <br />
          <br />
          <Typography align="justified">
            Computers, mobile phones, and other digital home appliances are now
            inextricable parts of the structure of modern societies, made
            possible by the small size and low cost of ___________ .
          </Typography>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
