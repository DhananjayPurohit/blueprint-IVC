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
  const [data, setData] = useState([{"name":"Dhananjay Purohit","time":1.2309999999999999,"score":90},
  {"correct":true,"name":"Vedang Joshi","time":1.345,"score":100},
  {"correct":false,"name":"Ritik Jain","time":2.3,"score":80}]);
//   fetch("https://eaogudskckezrfywev.pythonanywhere.com/leader")
//     .then((response) => response.json())
//     .then((data) => setData(data.items));

  return (
    <React.Fragment>
      {/* <Title>Most recent question</Title> */}
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
              <TableCell>{row.time.toFixed(2)}</TableCell>
              <TableCell align="right">
                <CustomizedProgressBars val={row.score}/>
                {`${row.score} %`}
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
