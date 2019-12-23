import {
  Button, makeStyles, Typography,
} from '@material-ui/core';
import React, { useCallback, useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const fileInput = useRef();

  const submit = useCallback((e) => {

  }, [fileInput]);

  return (
    <>
      <Typography variant="h6" className={classes.title}>Schülerupload</Typography>
      <Typography color="error">
        Achtung: Wenn eine neue Tabelle mit Schülern hochgeladen wird, werden alle Ergebnisse,
        welche mit den alten Schülern verknüpft waren ebenfalls gelöscht.
      </Typography>
      <Button
        className={classes.uploadButton}
        component="label"
        variant="contained"
        color="primary"
      >
        Schülerdaten auswählen
        <input type="file" onChange={submit} accept="text/csv" className={classes.input} ref={fileInput} />
      </Button>
    </>
  );
};
