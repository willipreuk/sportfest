import React from 'react';
import { Grid } from '@material-ui/core';
import Table from './Table';

export default () => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <Table />
    </Grid>
  </Grid>
);
