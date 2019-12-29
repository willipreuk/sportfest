import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Filter from './Filter';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Filter />
        </Paper>
      </Grid>
    </Grid>
  );
};
