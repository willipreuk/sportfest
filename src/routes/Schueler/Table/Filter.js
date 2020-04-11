import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ALL_KLASSEN = gql`
  {
    allKlassen {
      klassen {
        id
        stufe
        name
      }
    }
  }
`;

const Filter = ({ klasse, setKlasse }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(ALL_KLASSEN);

  if (loading) return null;

  const klassen = data.allKlassen.klassen.sort((a, b) => a.stufe - b.stufe);

  return (
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
            {s.stufe}/{s.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
Filter.propTypes = {
  klasse: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setKlasse: PropTypes.func.isRequired,
};

export default Filter;
