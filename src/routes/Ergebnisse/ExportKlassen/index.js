import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { CloudDownload as CloudDownloadIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import createPDF from './createPDF';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AUSWERTUNG_STUFEN = gql`
    query AuswertungStufen($von: Int!, $bis: Int!) {
        auswertungStufen(von: $von, bis: $bis) {
            besteKlassen {
                klasse {
                    name
                    stufe
                }
                durchschnitt
                schuelerAuswertung {
                    schueler {
                        nachname
                        vorname
                    }
                    note
                    punkte
                }
            }
        } 
    }
`;

export default () => {
  const classes = useStyles();
  const { von, bis } = useSelector((state) => state.ergebnis.filter);
  const { loading, data } = useQuery(AUSWERTUNG_STUFEN, { variables: { von, bis } });

  if (loading && !data) return null;
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
        onClick={() => createPDF(data.auswertungStufen, von, bis)}
      >
        Download
      </Button>
    </>
  );
};
