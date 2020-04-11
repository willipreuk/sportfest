import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { CloudDownload as CloudDownloadIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import createPDF from './createPDF';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));

const ExportKlassen = ({ data }) => {
  const classes = useStyles();
  const { von, bis } = useSelector((state) => state.ergebnis.filter);

  return (
    <>
      <Typography variant="h6">Alle Klassen exportieren</Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<CloudDownloadIcon />}
        onClick={() => createPDF(data, von, bis)}
      >
        Download
      </Button>
    </>
  );
};
ExportKlassen.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExportKlassen;
