import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import KlassenForm from './KlassenForm';
import { setLoading, setNotification } from '../../../../actions/uiState';

const useStyles = makeStyles((theme) => ({
  select: {
    width: theme.spacing(10),
    textAlign: 'center',
  },
  selectLabel: {
    marginTop: theme.spacing(1),
  },
  innerGrid: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  box: {
    marginTop: theme.spacing(2),
  },
}));

const UPDATE_ERGEBNIS = gql`
  mutation updateErgebnis($iddiziplin: Int!, $idklasse: Int!, $wert: Float!) {
    updateKlassenErgebnis(iddisziplin: $iddiziplin, idklasse: $idklasse, wert: $wert) {
      id
    }
  }
`;

const Staffel = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const klassenGrouped = groupBy(data.allKlassen.klassen, 'stufe');
  const [updateErgebnis] = useMutation(UPDATE_ERGEBNIS);
  const [klassenStufe, setKlasseStufe] = useState(Object.keys(klassenGrouped)[0]);
  const staffel = data.allDisziplin.disziplinen.find((disziplin) => disziplin.name === 'Staffel');
  const staffelErgebnisse = data.allKlassenErgebnis.filter(
    (ergebnis) => ergebnis.disziplin.name === staffel.name,
  );

  const onSubmit = async (values) => {
    dispatch(setLoading(true));
    await Promise.all(
      Object.keys(values).map((key) => {
        const klasse = values[key];
        const minuten = parseInt(klasse.minuten, 10);
        const sekunden = parseInt(klasse.sekunden, 10);
        const millis = parseInt(klasse.millis, 10);

        return updateErgebnis({
          variables: {
            iddiziplin: staffel.id,
            idklasse: parseInt(key, 10),
            wert: 60 * minuten + sekunden + millis / 100,
          },
        });
      }),
    ).catch(() => setNotification('error', 'Error'));
    dispatch(setLoading(false));
    dispatch(setNotification('success', 'Erfolgreich eingetragen'));
  };

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Typography className={classes.selectLabel}>Klassenstufe auswählen:</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Select
          className={classes.select}
          value={klassenStufe}
          onChange={(event) => void setKlasseStufe(event.target.value)}
        >
          {Object.keys(klassenGrouped).map((key) => (
            <MenuItem value={key} key={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} className={classes.innerGrid}>
        <KlassenForm
          klassen={klassenGrouped[klassenStufe]}
          onSubmit={onSubmit}
          ergebnisse={staffelErgebnisse}
        />
      </Grid>
    </Grid>
  );
};
Staffel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Staffel;
