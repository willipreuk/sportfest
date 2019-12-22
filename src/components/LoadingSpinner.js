import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export default () => (
  <Grid
    container
    spacing={0}
    align="center"
    justify="center"
    direction="column"
  >
    <Grid item>
      <CircularProgress style={{ height: '100%' }} />
    </Grid>
  </Grid>
);
