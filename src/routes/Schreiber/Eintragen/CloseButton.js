import React, { useCallback, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { resetSchreiber } from '../../../actions/schreiber';
import ActionDialog from '../../../components/ActionDialog';
import CloseButton from '../../../components/Schreiber/CloseButton';

export default () => {
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
      <CloseButton handleClick={handleOpen} />
      <ActionDialog open={open} actions={actions} handleClose={handleClose} title="Achtung">
        <Typography>
          Wirklich alle aktuellen Daten verwerfen und eine neue Klasse auswählen?
        </Typography>
      </ActionDialog>
    </>
  );
};
