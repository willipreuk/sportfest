import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { CloudDownload as CloudDownloadIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import createPDF from './createPDF';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const { von, bis } = useSelector((state) => state.filter);
  return (
    <>
      <Typography variant="h6">Alle Klassen exportieren</Typography>
      <Typography>
        Hier können Sie alle Ergebnisse von den oben ausgewählten Klassen als PDF Datei exportieren.
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<CloudDownloadIcon />}
        onClick={createPDF(von, bis)}
      >
        Download
      </Button>
    </>
  );
};
