import React, { useCallback, useState } from 'react';
import { Close as CloseIcon } from '@material-ui/icons';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resetSchreiber } from '../../../actions/schreiber';
import ActionDialog from '../../../components/ActionDialog';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleSubmit = useCallback(() => {
    setOpen(false);
    dispatch(resetSchreiber());
  }, [setOpen, dispatch]);

  const actions = [
    { onClick: handleSubmit, text: 'Fortfahren' },
    { onClick: handleClose, primary: true, text: 'Abbrechen' },
  ];

  return (
    <>
      <IconButton className={classes.closeButton} onClick={handleOpen}>
        <CloseIcon />
      </IconButton>
      <ActionDialog open={open} actions={actions} handleClose={handleClose} title="Achtung">
        <Typography>
          Wirklich alle aktuellen Daten verwerfen und eine neue Klasse auswählen?
        </Typography>
      </ActionDialog>
    </>
  );
};
