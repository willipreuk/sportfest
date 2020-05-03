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
}));

const KlassenForm = ({ klassen, onSubmit, disziplin, ergebnisse }) => {
  const classes = useStyles();
  const objKlassen = keyBy(klassen, 'id');

  const initialValues = {};
  // map klassen id as obj key and find ergebnis as value
  Object.keys(objKlassen).forEach((key) => {
    const ergebnis = ergebnisse.find((ergebniss) => ergebniss.klasse.id === parseInt(key, 10));
    initialValues[key] = ergebnis ? ergebnis.wert : 0;
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
            Klasse: {`${klasse.stufe}/${klasse.name}`}
          </Typography>
          <FormControl>
            <OutlinedInput
              {...getFieldProps(klasse.id)}
              id={`${klasse.id}`}
              name={`${klasse.id}`}
              type="number"
              endAdornment={<InputAdornment>{disziplin.einheit}</InputAdornment>}
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
  disziplin: PropTypes.object.isRequired,
  ergebnisse: PropTypes.array.isRequired,
};

export default KlassenForm;
