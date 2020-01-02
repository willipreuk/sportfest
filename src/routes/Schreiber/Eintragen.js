import React, { useState } from 'react';
import {
  Container, makeStyles, Paper, TextField, Typography, Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import useSchueler from './useSchueler';
import { decCounter, incCounter, setErgebnis } from '../../actions/schreiber';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    textAlign: 'center',
    width: '100%',
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const { schueler, counter } = useSelector((state) => state.schreiber);
  const dispatch = useDispatch();
  const [value, setValue] = useState('0');
  const {
    loading, disziplin,
  } = useSchueler();

  if (loading || schueler.length === 0) return <LoadingSpinner />;

  const currentSchueler = schueler[counter];
  return (
    <>
      <Typography>{`Disziplin: ${disziplin.name}`}</Typography>
      <Typography>{`Klasse: ${currentSchueler.klasse.stufe}/${currentSchueler.klasse.name}`}</Typography>
      <Typography>{`Aktueller Versuch: ${currentSchueler.versuch + 1}`}</Typography>
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography className={classes.heading} variant="h6">Wert eintragen</Typography>
          <Typography>{`${currentSchueler.vorname} ${currentSchueler.nachname}`}</Typography>
          <TextField
            className={classes.input}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            className={classes.backButton}
            disabled={counter < 1}
            onClick={() => dispatch(decCounter())}
          >
            Zurück
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(setErgebnis(currentSchueler.id, value));
              dispatch(incCounter());
              setValue('0');
            }}
          >
            Nächster
          </Button>
        </Paper>
      </Container>
    </>
  );
};
