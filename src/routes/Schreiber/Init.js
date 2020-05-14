import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
  Box,
  Button,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDisziplin as dispatchDisziplin,
  setKlasse as dispatchKlasse,
} from '../../actions/schreiber';
import useLoadingQuery from '../../hooks/useLoadingQuery';
import UserMenu from '../../components/Navigation/UserMenu';

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
        einheit
        id
        best
        klasse
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
  account: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.uiState.loading);
  const { data: rawData } = useLoadingQuery(GET_KLASSEN_DISZIPLINEN);
  const dispatch = useDispatch();
  const [klasse, setKlasse] = useState(1);
  const [disziplin, setDisziplin] = useState(1);

  if (loading || !rawData) return null;
  const data = { ...rawData };
  data.allDisziplin.disziplinen = data.allDisziplin.disziplinen.filter(
    (item) => item.klasse === false,
  );

  return (
    <>
      <Box className={classes.account}>
        <UserMenu allowEdit={false} />
      </Box>

      <Container maxWidth="xs" className={classes.container}>
        <Typography>Stationsauswahl</Typography>
        <Select
          className={classes.select}
          value={disziplin}
          onChange={(e) => setDisziplin(e.target.value)}
        >
          {data.allDisziplin.disziplinen.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
        <Typography>Klassenauswahl</Typography>
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
            dispatch(
              dispatchDisziplin(data.allDisziplin.disziplinen.find((d) => d.id === disziplin)),
            );
            dispatch(dispatchKlasse(klasse));
          }}
        >
          Bestätigen
        </Button>
      </Container>
    </>
  );
};
