import PropTypes from 'prop-types';
import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const CreateButton = ({ path }) => {
  const dispatch = useDispatch();

  return (
    <IconButton color="primary" onClick={() => dispatch(push(path))}>
      <Add />
    </IconButton>
  );
};
CreateButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default CreateButton;
