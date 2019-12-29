import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid, InputLabel, Select, MenuItem, makeStyles, Typography,
} from '@material-ui/core';
import { setRange } from '../../actions/ergebnis';

const klassen = [
  5, 6, 7, 8, 9, 10,
];

const useStyles = makeStyles(() => ({
  select: {
    width: '100%',
    textAlign: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [von, setVon] = useState(5);
  const [bis, setBis] = useState(10);

  useEffect(() => {
    dispatch(setRange({ von, bis }));
  }, [von, bis, dispatch]);

  return (
    <>
      <Typography variant="h6">
        Filter
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <InputLabel id="filter-von">Von</InputLabel>
          <Select
            className={classes.select}
            labelId="filter-von"
            value={von}
            onChange={(e) => setVon(e.target.value)}
          >
            {klassen.map((k) => (<MenuItem value={k} key={k}>{k}</MenuItem>))}
          </Select>
        </Grid>
        <Grid item xs={2}>
          <InputLabel id="filter-bis">Bis</InputLabel>
          <Select
            className={classes.select}
            labelId="filter-bis"
            value={bis}
            onChange={(e) => setBis(e.target.value)}
          >
            {klassen.map((k) => (<MenuItem value={k} key={k}>{k}</MenuItem>))}
          </Select>
        </Grid>
      </Grid>
    </>
  );
};
