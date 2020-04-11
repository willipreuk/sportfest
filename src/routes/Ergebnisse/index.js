import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Filter from './Filter';
import Best from './Best';
import ExportKlassen from './ExportKlassen';
import useLoadingQuery from '../../hooks/useLoadingQuery';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  top: {
    minHeight: theme.spacing(15),
  },
}));

const AUSWERTUNG_SCHUELER = gql`
  query($von: Int!, $bis: Int!) {
    auswertungStufen(von: $von, bis: $bis) {
      bestM {
        schueler {
          id
          vorname
          nachname
          klasse {
            stufe
            name
          }
        }
        punkte
      }
      bestW {
        schueler {
          id
          vorname
          nachname
          klasse {
            stufe
            name
          }
        }
        punkte
      }
      besteKlassen {
        durchschnitt
        klasse {
          name
          id
          stufe
        }
        schuelerAuswertung {
          schueler {
            vorname
            nachname
          }
          note
          punkte
        }
      }
    }
  }
`;

const createSchuelerData = (data) =>
  data.slice(0, 5).map((item) => ({
    punkte: item.punkte,
    name: `${item.schueler.vorname} ${item.schueler.nachname} - ${item.schueler.klasse.stufe}/${item.schueler.klasse.name}`,
    id: item.schueler.id,
  }));
const createKlassenData = (data) =>
  data.slice(0, 5).map((item) => ({
    punkte: item.durchschnitt ? item.durchschnitt : 0,
    name: `${item.klasse.stufe}/${item.klasse.name}`,
    id: item.klasse.id,
  }));

export default () => {
  const classes = useStyles();
  const { von, bis } = useSelector((state) => state.ergebnis.filter);
  const { data } = useLoadingQuery(AUSWERTUNG_SCHUELER, { variables: { von, bis } });

  if (!data) return null;
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Paper className={clsx(classes.paper, classes.top)}>
          <Filter />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={clsx(classes.paper, classes.top)}>
          <ExportKlassen data={data.auswertungStufen.besteKlassen} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Best title="Beste Mädchen" data={createSchuelerData(data.auswertungStufen.bestW)} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Best title="Beste Jugen" data={createSchuelerData(data.auswertungStufen.bestM)} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Best
            title="Beste Klassen"
            data={createKlassenData(data.auswertungStufen.besteKlassen)}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
