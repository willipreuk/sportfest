import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const CloseButton = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <IconButton onClick={handleClick} className={classes.button}>
      <CloseIcon />
    </IconButton>
  );
};
CloseButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CloseButton;
