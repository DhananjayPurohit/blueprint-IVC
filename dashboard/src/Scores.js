import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from "@material-ui/core/IconButton";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  refresh: {
    marginLeft: "90%",
  },
}));

export default function Scores() {
  const classes = useStyles();
  const [data,setData]=useState([]);
  fetch('https://28368363663e.ngrok.io/leader')
  .then(response => response.json())
  .then(data => setData(data.items));

  const Refresh = () => {
    console.log("press");
    fetch('https://28368363663e.ngrok.io/leader')
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
            <TableCell>Time Taken</TableCell>
            <TableCell align="right">Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell align="right">{row.correct?<DoneIcon style={{color:"green"}}/>:<ClearIcon style={{color:"red"}}/>}</TableCell>
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