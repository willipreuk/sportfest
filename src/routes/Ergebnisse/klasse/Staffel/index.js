import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KlassenForm from './KlassenForm';

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

const Staffel = ({ data }) => {
  const classes = useStyles();
  const klassenGrouped = groupBy(data.allKlassen.klassen, 'stufe');
  const [klassenStufe, setKlasseStufe] = useState(Object.keys(klassenGrouped)[0]);
  const staffel = data.allDisziplin.disziplinen.find((disziplin) => disziplin.name === 'Staffel');

  const onSubmit = (values) => {
    console.log(values);
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
          disziplin={staffel}
          onSubmit={onSubmit}
        />
      </Grid>
    </Grid>
  );
};
Staffel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Staffel;
