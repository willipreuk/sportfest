import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';

const ActionDialog = ({
  title, children, actions, handleClose, open,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      {actions.map((action) => (
        <Button
          key={action.text}
          variant={action.primary ? 'contained' : ''}
          color={action.primary ? 'primary' : ''}
          onClick={action.onClick}
        >
          {action.text}
        </Button>
      ))}
    </DialogActions>
  </Dialog>
);
ActionDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape(
      { text: PropTypes.string.isRequired, primary: PropTypes.bool },
    ),
  ).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ActionDialog;
