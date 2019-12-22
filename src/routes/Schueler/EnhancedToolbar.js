import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ALL_KLASSEN = gql`
  {
    allklassen {
      id
      stufe
      name
     }
  }
`;

const EnhancedToolbar = ({ title, klasse, setKlasse }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(ALL_KLASSEN);
  if (loading) return null;
  const klassen = data.allklassen.sort((a, b) => a.stufe - b.stufe);
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {title}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="klasse-filter-label">Klasse</InputLabel>
        <Select
          labelId="klasse-filter-label"
          id="klasse-filter"
          value={klasse}
          onChange={(e) => setKlasse(e.target.value)}
        >
          <MenuItem value={0}>*</MenuItem>
          {klassen.map((s) => (
            <MenuItem value={s.id} key={s.id}>
              {s.stufe}
              /
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
};
EnhancedToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  klasse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setKlasse: PropTypes.func.isRequired,
};

export default EnhancedToolbar;
