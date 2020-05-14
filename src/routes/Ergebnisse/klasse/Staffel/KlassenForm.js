/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { keyBy } from 'lodash';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  klasseTypography: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: theme.spacing(4),
  },
  submitBox: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  input: {
    width: '90%',
  },
}));

const KlassenForm = ({ klassen, onSubmit, ergebnisse }) => {
  const classes = useStyles();
  const objKlassen = keyBy(klassen, 'id');

  const initialValues = {};
  // map klassen id as obj key and find ergebnis as value
  Object.keys(objKlassen).forEach((key) => {
    const ergebnis = ergebnisse.find((ergebniss) => ergebniss.klasse.id === parseInt(key, 10));
    initialValues[key] = {};
    if (ergebnis) {
      const minuten = Math.floor(ergebnis.wert / 60);
      const rest = ergebnis.wert % 60;
      const sekunden = Math.floor(rest);
      const millis = Math.round((rest - Math.floor(rest)) * 10);

      initialValues[key].minuten = minuten;
      initialValues[key].sekunden = sekunden;
      initialValues[key].millis = millis;
    } else {
      initialValues[key].minuten = 0;
      initialValues[key].sekunden = 0;
      initialValues[key].millis = 0;
    }
  });

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Container>
      {klassen.map((klasse) => (
        <Box display="flex" className={classes.box} key={klasse.id} justifyContent="center">
          <Typography className={classes.klasseTypography}>
            {`${klasse.stufe}/${klasse.name}`}
          </Typography>
          <FormControl>
            <OutlinedInput
              className={classes.input}
              {...getFieldProps(`${klasse.id}.minuten`)}
              id={`${klasse.id}.minuten`}
              name={`${klasse.id}.minuten`}
              type="number"
              endAdornment={<InputAdornment>min</InputAdornment>}
            />
          </FormControl>
          <FormControl>
            <OutlinedInput
              className={classes.input}
              {...getFieldProps(`${klasse.id}.sekunden`)}
              id={`${klasse.id}.sekunden`}
              name={`${klasse.id}.sekunden`}
              type="number"
              endAdornment={<InputAdornment>s</InputAdornment>}
            />
          </FormControl>
          <FormControl>
            <OutlinedInput
              className={classes.input}
              {...getFieldProps(`${klasse.id}.millis`)}
              id={`${klasse.id}.millis`}
              name={`${klasse.id}.millis`}
              type="number"
              endAdornment={<InputAdornment>1/10</InputAdornment>}
            />
          </FormControl>
        </Box>
      ))}
      <Box className={classes.submitBox} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Bestätigen
        </Button>
      </Box>
    </Container>
  );
};
KlassenForm.propTypes = {
  klassen: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ergebnisse: PropTypes.array.isRequired,
};

export default KlassenForm;
