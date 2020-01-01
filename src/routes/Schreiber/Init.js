import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  Select, MenuItem, makeStyles, Typography, Container, Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { setDisziplin as dispatchDisziplin, setKlasse as dispatchKlasse } from '../../actions/schreiber';

const GET_KLASSEN_DISZIPLINEN = gql`
  query {
    allKlassen {
      klassen {
        stufe
        name
        id
      }
    }
    allDisziplin {
      disziplinen { 
        name
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  select: {
    width: '50%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const { data, loading } = useQuery(GET_KLASSEN_DISZIPLINEN);
  const dispatch = useDispatch();
  const [klasse, setKlasse] = useState(1);
  const [disziplin, setDisziplin] = useState(1);

  if (loading) return <LoadingSpinner />;

  return (
    <Container className={classes.container}>
      <Typography>
        Wähle zuerst deine Station aus.
      </Typography>
      <Select
        className={classes.select}
        value={disziplin}
        onChange={(e) => setDisziplin(e.target.value)}
      >
        {data.allDisziplin.disziplinen.map((d) => (
          <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
        ))}
      </Select>
      <Typography>
        Wähle jetzt deine erste Klasse aus.
      </Typography>
      <Select
        className={classes.select}
        value={klasse}
        onChange={(e) => setKlasse(e.target.value)}
      >
        {data.allKlassen.klassen.map((k) => (
          <MenuItem key={k.id} value={k.id}>{`${k.stufe}/${k.name}`}</MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(dispatchDisziplin(disziplin));
          dispatch(dispatchKlasse(klasse));
        }}
      >
        Bestätigen
      </Button>
    </Container>
  );
};
