import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  InputAdornment,
  OutlinedInput,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import useSchueler from './useSchueler';
import { decCounter, incCounter, setErgebnis } from '../../actions/schreiber';
import SchuelerSelect from './SchuelerSelect';

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
    marginBottom: theme.spacing(6),
    textAlign: 'center',
  },
  list: {
    width: '100%',
    textAlign: 'center',
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
      <Container>
        <Paper className={classes.paper}>
          <Typography className={classes.heading} variant="h6">Wert eintragen</Typography>
          <Typography>
            {`${currentSchueler.vorname} ${currentSchueler.nachname}`}
            {currentSchueler.status !== null ? (
              <span>
                {' - '}
                <b>KRANK</b>
              </span>
            ) : null}
          </Typography>
          <OutlinedInput
            className={classes.input}
            value={value}
            type="number"
            onChange={(e) => setValue(e.target.value)}
            endAdornment={<InputAdornment position="end">{disziplin.einheit}</InputAdornment>}
            inputProps={{
              'aria-label': disziplin.einheit,
            }}
            labelWidth={0}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <SchuelerSelect />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                disabled={counter < 1}
                onClick={() => dispatch(decCounter())}
              >
                Zurück
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                onClick={() => dispatch(incCounter())}
              >
                Überspringen
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(setErgebnis(currentSchueler.id, value));
                  dispatch(incCounter());
                  setValue('0');
                }}
              >
                Eintragen
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Bisherige Versuche</Typography>
          <List>
            {currentSchueler.ergebnisseSchueler.length === 0 ? <Typography>-</Typography> : null}
            {currentSchueler.ergebnisseSchueler.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={`${e}+${i}`}>
                <Typography>{`${i + 1}. Versuch ${e} ${disziplin.einheit}`}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};
