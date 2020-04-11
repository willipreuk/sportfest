import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

const AlertDialog = ({ open, setOpen, submit }) => (
  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogTitle id="alert-dialog-title">Wirklich fortfahren?</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Bei einem Hochladen von Schülerdaten werden alle aktuell im System gespeicherten Schüler
        mitsamt ihrer Ergebnisse gelöscht.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={submit}>Fortfahren</Button>
      <Button onClick={() => setOpen(false)} color="primary" autoFocus>
        Abbrechen
      </Button>
    </DialogActions>
  </Dialog>
);
AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default AlertDialog;
