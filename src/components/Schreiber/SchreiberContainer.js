import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SchreiberContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {`Sportfest ${new Date().getFullYear()}`}
        </Typography>
        {children}
      </div>
    </Container>
  );
};
SchreiberContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SchreiberContainer;
