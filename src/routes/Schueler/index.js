import React from 'react';
import {
  makeStyles, Paper,
} from '@material-ui/core';
import Table from './Table';
import SchuelerUpload from './SchuelerUpload';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <>
      <Table />
      <Paper className={classes.paper}>
        <SchuelerUpload />
      </Paper>
    </>
  );
};
