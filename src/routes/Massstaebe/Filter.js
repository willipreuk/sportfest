import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Filter = ({ label, value, values, setValue }) => {
  const classes = useStyles();

  const setValueCallback = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`${label}-filter-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-filter-label`}
        id={`${label}-filter`}
        value={value}
        onChange={setValueCallback}
      >
        <MenuItem value={0}>*</MenuItem>
        {values.map((s) => (
          <MenuItem value={s.id} key={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
Filter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Filter;
