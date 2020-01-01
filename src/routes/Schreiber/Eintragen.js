import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import {
  Container, makeStyles, Paper, TextField, Typography, Button,
} from '@material-ui/core';
import LoadingSpinner from '../../components/LoadingSpinner';

const GET_SCHUELER = gql`
  query($klasse: Int!, $disziplin: Int!) {
     allSchueler(idklasse: $klasse) {
        schueler {
          vorname
          nachname
          id
          status
        }
     }
     disziplin(id: $disziplin) {
        name
     }
     klasse(id: $klasse) {
        stufe
        name
     }
  }
`;

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
  const { klasse, disziplin } = useSelector((state) => state.schreiber);
  const { data, loading } = useQuery(GET_SCHUELER, { variables: { klasse, disziplin } });
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState('0');

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Typography>{`Disziplin: ${data.disziplin.name}`}</Typography>
      <Typography>{`Klasse: ${data.klasse.stufe}/${data.klasse.name}`}</Typography>
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography className={classes.heading} variant="h6">Wert eintragen</Typography>
          <Typography>{`${data.allSchueler.schueler[counter].vorname} ${data.allSchueler.schueler[counter].nachname}`}</Typography>
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
            onClick={() => setCounter((prevState) => prevState - 1)}
          >
            Zurück
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCounter((prevState) => prevState + 1)}
          >
            Nächster
          </Button>
        </Paper>
      </Container>
    </>
  );
};
