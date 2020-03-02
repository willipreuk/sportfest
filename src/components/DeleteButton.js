import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  button: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const DeleteButton = ({ action }) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.button} color="primary" onClick={() => action()}>
      <Delete />
    </IconButton>
  );
};
DeleteButton.propTypes = {
  action: PropTypes.func.isRequired,
};

export default DeleteButton;
