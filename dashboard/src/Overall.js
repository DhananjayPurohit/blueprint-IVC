import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import LinearProgress from '@material-ui/core/LinearProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from "@material-ui/core/IconButton";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  refresh: {
    marginLeft: "90%",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green",
  },
}))(LinearProgress);

function CustomizedProgressBars(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={props.val} />
      </div>
    );
  }

export default function Overall() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  
  fetch("https://28368363663e.ngrok.io/score")
    .then((response) => response.json())
    .then((data) => setData(data.items));

const Refresh = () => {
    console.log("press");
    fetch('https://28368363663e.ngrok.io/score')
    .then(response => response.json())
    .then(data => setData(data.items));
  }

  return (
    <React.Fragment>
      {/* <Title>Most recent question</Title> */}
      <IconButton aria-label="refresh" className={classes.refresh} onClick={() => Refresh()}>
                <RefreshIcon />
              </IconButton>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
                <CustomizedProgressBars val={row.score*10}/>
                {`${row.score*10} %`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more
        </Link>
      </div>
    </React.Fragment>
  );
}
