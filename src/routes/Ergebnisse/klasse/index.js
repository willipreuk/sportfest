import React, { useState } from 'react';
import { Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import SchreiberContainer from '../../../components/Schreiber/SchreiberContainer';
import useLoadingQuery from '../../../hooks/useLoadingQuery';
import CloseButton from '../../../components/Schreiber/CloseButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 500,
  },
  appBar: {
    marginTop: theme.spacing(3),
  },
}));

const GET_DISZIPLIN = gql`
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

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: rawData } = useLoadingQuery(GET_DISZIPLIN);
  const [tab, setTab] = useState(0);

  if (!rawData) return null;

  const data = { ...rawData };
  data.allDisziplin.disziplinen = data.allDisziplin.disziplinen.filter(
    (item) => item.klasse === true,
  );

  return (
    <SchreiberContainer heading className={classes.root}>
      <CloseButton handleClick={() => dispatch(push('/ergebnisse'))} />
      <Typography>Ergebnisse eintragen für klassenbasierte Disziplinen</Typography>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          centered
          indicatorColor="primary"
          textColor="primary"
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
        >
          {data.allDisziplin.disziplinen.map((disziplin) => (
            <Tab label={disziplin.name} id={disziplin.id} key={disziplin.id} />
          ))}
        </Tabs>
      </AppBar>
    </SchreiberContainer>
  );
};
