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
  heading: {
    textAlign: 'center',
  },
}));

const SchreiberContainer = ({ children, heading }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          {`Sportfest ${new Date().getFullYear()}`}
        </Typography>
        {heading ? (
          <Typography variant="h5" className={classes.heading}>
            Giebichenstein-Gymnasium &quot;Thomas Müntzer&quot;
          </Typography>
        ) : null}
        {children}
      </div>
    </Container>
  );
};
SchreiberContainer.propTypes = {
  children: PropTypes.element.isRequired,
  heading: PropTypes.bool,
};
SchreiberContainer.defaultProps = {
  heading: false,
};

export default SchreiberContainer;
