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
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { LocalHospital as LocalHospitalIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import useSchueler from './useSchueler';
import { decCounter, incCounter, setErgebnis, setVerletzt } from '../../../actions/schreiber';
import SchuelerSelect from './SchuelerSelect';
import Finished from '../Finished';
import ErgebnisseBearbeiten from './ErgebnisseBearbeiten';
import CloseButton from './CloseButton';
import { setNotification } from '../../../actions/uiState';

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
  verletzt: {
    position: 'absolute',
    marginTop: '4px',
  },
  verletztTrue: {
    color: 'red',
  },
}));

export default () => {
  const classes = useStyles();
  const { schueler, counter, finished, disziplin } = useSelector((state) => state.schreiber);
  const dispatch = useDispatch();
  const [value, setValue] = useState('0');
  const { loading } = useSchueler();

  if (loading || schueler.length === 0) return null;
  const currentSchueler = schueler[counter];

  if (finished) return <Finished />;

  return (
    <>
      <CloseButton />
      <Typography>{`Disziplin: ${disziplin.name}`}</Typography>
      <Typography>{`Klasse: ${currentSchueler.klasse.stufe}/${currentSchueler.klasse.name}`}</Typography>
      <Typography>{`Aktueller Versuch: ${currentSchueler.versuch + 1}`}</Typography>
      <Container>
        <Paper className={classes.paper}>
          <Typography className={classes.heading} variant="h6">
            Wert eintragen
          </Typography>
          <Typography>
            {`${currentSchueler.vorname} ${currentSchueler.nachname}`}
            {currentSchueler.status !== null ? (
              <span>
                {' - '}
                <b>KRANK</b>
              </span>
            ) : null}
          </Typography>
          <div>
            <OutlinedInput
              className={classes.input}
              value={value}
              type="number"
              min={disziplin.lowestWert}
              max={disziplin.highestWetr}
              onChange={(e) => setValue(e.target.value)}
              endAdornment={<InputAdornment position="end">{disziplin.einheit}</InputAdornment>}
              inputProps={{
                'aria-label': disziplin.einheit,
              }}
              disabled={currentSchueler.status !== null || currentSchueler.stationsStatus !== null}
            />
            <Tooltip title="Schüler verletzt">
              <IconButton
                className={clsx(
                  classes.verletzt,
                  currentSchueler.stationsStatus !== null && classes.verletztTrue,
                )}
                onClick={() => {
                  dispatch(setVerletzt(currentSchueler.id, !currentSchueler.stationsStatus));
                }}
              >
                <LocalHospitalIcon />
              </IconButton>
            </Tooltip>
          </div>
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
              <Button variant="outlined" onClick={() => dispatch(incCounter())}>
                Überspringen
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  if (currentSchueler.stationsStatus === null) {
                    if (value >= disziplin.lowestWert && value <= disziplin.highestWert) {
                      dispatch(setErgebnis(currentSchueler.id, value));
                    } else {
                      dispatch(setNotification('error', 'Ungültiges Ergebnis'));
                      return;
                    }
                  }
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
          <ErgebnisseBearbeiten currentSchueler={currentSchueler} einheit={disziplin.einheit} />
          <List>
            {currentSchueler.ergebnisseSchueler.length === 0 ? (
              <Typography>-</Typography>
            ) : (
              currentSchueler.ergebnisseSchueler.map((e, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={`${e}+${i}`}>
                  <Typography>{`${i + 1}. Versuch ${e}${disziplin.einheit}`}</Typography>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Container>
    </>
  );
};
