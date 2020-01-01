import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {`Sportfest ${new Date().getFullYear()}`}
        </Typography>
      </div>
    </Container>
  );
};
