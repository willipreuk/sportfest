/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  Switch,
  MenuItem,
  FormControlLabel,
} from '@material-ui/core';
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
}));

const DisziplinenForm = ({ initialValues, onSubmit }) => {
  const classes = useStyles();
  const { handleSubmit, errors, getFieldProps, isValid, values } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, 'Name muss mindestens 4 lang sein.')
        .max(255, 'Name darf nicht länger als 255 Zeichen sein.')
        .required(),
      best: Yup.string().required(),
      einheit: Yup.string().max(2, 'Einheit darf nicht länger als 2 Zeichen sein.').required(),
      klasse: Yup.bool().required(),
    }),
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper className={classes.root}>
            <FormControl className={classes.input} error={!!errors.name}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="name"
                aria-describedby="name-helper-text"
                {...getFieldProps('name')}
              />
              <FormHelperText id="name-helper-text">{errors.name}</FormHelperText>
            </FormControl>
            <br />
            <FormControl className={classes.input} error={!!errors.best}>
              <InputLabel htmlFor="name">Bestes</InputLabel>
              <Select
                id="best"
                name="best"
                aria-describedby="best-helper-text"
                {...getFieldProps('best')}
              >
                <MenuItem value="low">Niedrigste</MenuItem>
                <MenuItem value="high">Höchste</MenuItem>
              </Select>
              <FormHelperText id="best-helper-text">{errors.best}</FormHelperText>
            </FormControl>
            <br />
            <FormControl className={classes.input} error={!!errors.einheit}>
              <InputLabel htmlFor="name">Einheit</InputLabel>
              <Input
                id="einheit"
                name="einheit"
                aria-describedby="einheit-helper-text"
                {...getFieldProps('einheit')}
              />
              <FormHelperText id="einheit-helper-text">{errors.einheit}</FormHelperText>
            </FormControl>
            <br />
            <FormControlLabel
              control={
                <Switch
                  name="klasse"
                  id="klasse"
                  {...getFieldProps('klasse')}
                  checked={values.klasse}
                />
              }
              label="Klassenweise Auswertung"
            />
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
DisziplinenForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
DisziplinenForm.defaultProps = {
  initialValues: { name: '', best: '', einheit: '', klasse: false },
};

export default DisziplinenForm;
