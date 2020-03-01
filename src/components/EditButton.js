import PropTypes from 'prop-types';
import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles(() => ({
  button: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const EditButton = ({ path }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <IconButton className={classes.button} color="primary" onClick={() => dispatch(push(path))}>
      <Edit />
    </IconButton>
  );
};
EditButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default EditButton;
