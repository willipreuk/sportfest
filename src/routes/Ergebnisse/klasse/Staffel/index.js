import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';
import { Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select: {
    width: theme.spacing(10),
    textAlign: 'center',
  },
  selectLabel: {
    marginTop: theme.spacing(1),
  },
}));

const Staffel = ({ data }) => {
  const classes = useStyles();
  const klassenGrouped = groupBy(data.allKlassen.klassen, 'stufe');
  const [klassenStufe, setKlasseStufe] = useState(Object.keys(klassenGrouped)[0]);
  const staffel = data.allDisziplin.disziplinen.find((disziplin) => disziplin.name === 'Staffel');
  return (
    <Grid container>
      <Grid item md={3}>
        <Typography className={classes.selectLabel}>Klassenstufe auswählen:</Typography>
      </Grid>
      <Grid item md={9}>
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
    </Grid>
  );
};
Staffel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Staffel;
