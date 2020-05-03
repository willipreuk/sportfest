/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  input: {
    width: '65%',
    marginBottom: theme.spacing(2),
  },
  submitBox: {
    textAlign: 'right',
  },
  error: {
    color: 'red',
    height: '100%',
  },
}));

const KlassenForm = ({ onSubmit, initialValues }) => {
  const classes = useStyles();

  const { handleSubmit, getFieldProps, errors, isValid } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      stufe: Yup.number().required('Stufe muss angegeben sein'),
      name: Yup.number().required('Name muss angegeben sein'),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper className={classes.root}>
            <FormControl className={classes.input} error={!!errors.stufe}>
              <InputLabel htmlFor="stufe">Stufe</InputLabel>
              <Input
                id="stufe"
                name="stufe"
                aria-describedby="name-helper-text"
                type="number"
                {...getFieldProps('stufe')}
              />
              <FormHelperText id="stufe-helper-text">{errors.stufe}</FormHelperText>
            </FormControl>
            <br />
            <FormControl className={classes.input} error={!!errors.name}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                aria-describedby="name-helper-text"
                type="number"
                {...getFieldProps('name')}
              />
              <FormHelperText id="best-helper-text">{errors.name}</FormHelperText>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12} />
        <Grid item md={6} xs={12} className={classes.submitBox}>
          <Paper className={classes.root}>
            <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
KlassenForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.number.isRequired,
    stufe: PropTypes.number.isRequired,
  }),
};
KlassenForm.defaultProps = {
  initialValues: {
    name: 0,
    stufe: 0,
  },
};

export default KlassenForm;
