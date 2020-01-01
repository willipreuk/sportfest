import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Init from './Init';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const { disziplin, klasse } = useSelector((state) => state.schreiber);

  return (
    <Container maxWidth="xs" component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {`Sportfest ${new Date().getFullYear()}`}
        </Typography>
        <Typography variant="h5" className={classes.heading}>
          Giebichenstein-Gymnasium &quot;Thomas Müntzer&quot;
        </Typography>
        {!disziplin && !klasse ? <Init /> : null}
      </div>
    </Container>
  );
};
