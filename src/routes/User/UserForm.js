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
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
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

const UserForm = ({ onSubmit, initialValues }) => {
  const classes = useStyles();

  const { handleSubmit, getFieldProps, errors, isValid } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(32, 'Nutzername muss maximal 32 Zeichen lang sein.')
        .min(4, 'Nutzername muss mindestens 4 Zeichen lang sein.')
        .required('Nutzername muss angegeben sein'),
      password: Yup.string().min(8, 'Passwort muss aus mind. 8 Zeichen bestehen.'),
      passwordConfirmation: Yup.string().when('password', {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string()
          .required('Bitte wiederholen Sie das Passwort')
          .oneOf([Yup.ref('password')], 'Passwörter stimmen nicht überein'),
      }),
    }),
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper className={classes.root}>
            <Typography variant="h6">Nutzerdaten ändern</Typography>
            <FormControl className={classes.input} error={!!errors.username}>
              <InputLabel htmlFor="username">Nutzername</InputLabel>
              <Input
                id="username"
                name="username"
                aria-describedby="username-helper-text"
                {...getFieldProps('username')}
              />
              <FormHelperText id="username-helper-text">{errors.username}</FormHelperText>
            </FormControl>
            <br />
            <FormControl className={classes.input}>
              <InputLabel htmlFor="role">Rolle</InputLabel>
              <Select id="role" name="role" {...getFieldProps('role')}>
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="leiter">Leiter</MenuItem>
                <MenuItem value="schreiber">Schreiber</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.root}>
            <Typography variant="h6">Passwort ändern</Typography>
            <FormControl className={classes.input} error={!!errors.password}>
              <InputLabel htmlFor="password">Passwort</InputLabel>
              <Input id="password" type="password" {...getFieldProps('password')} />
              <FormHelperText id="password-helper-text">{errors.password}</FormHelperText>
            </FormControl>
            <FormControl className={classes.input} error={!!errors.passwordConfirmation}>
              <InputLabel htmlFor="passwordConfirmation">Passwort wiederholen</InputLabel>
              <Input
                id="passwordConfirmation"
                type="password"
                aria-describedby="passwordConfirmation-helper-text"
                {...getFieldProps('passwordConfirmation')}
              />
              <FormHelperText id="passwordConfirmation-helper-text">
                {errors.passwordConfirmation}
              </FormHelperText>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={clsx(classes.root, classes.submitBox)}>
            <Button color="primary" type="submit" variant="contained" disabled={!isValid}>
              Abschicken
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirmation: PropTypes.string.isRequired,
  }),
};
UserForm.defaultProps = {
  initialValues: {
    username: '',
    role: '',
    password: '',
    passwordConfirmation: '',
  },
};

export default UserForm;
