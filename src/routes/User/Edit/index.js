/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import clsx from 'clsx';
import useLoading from '../../../hooks/useLoading';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { setPageName } from '../../../actions/navigation';

const USER = gql`
  query User($username: String) {
    user(username: $username) {
      rolle
      id
      username
    }
  }
`;

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

export default () => {
  const classes = useStyles();
  const { username: queryUser } = useParams();
  const dispatch = useDispatch();
  useEffect(() => { dispatch(setPageName(`Nutzer ${queryUser} bearbeiten`)); }, [dispatch, queryUser]);

  const { data, loading: tmpLoading } = useQuery(USER, { variables: { username: queryUser } });
  const { loading, setLoading } = useLoading();
  useEffect(() => setLoading(tmpLoading), [setLoading, tmpLoading]);

  const {
    handleSubmit, setFieldValue, getFieldProps, errors,
  } = useFormik({
    initialValues: {
      username: '',
      role: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(32, 'Nutzername muss maximal 32 Zeichen lang sein.')
        .min(4, 'Nutzername muss mindestens 4 Zeichen lang sein.')
        .required('Nutzername muss angegeben sein'),
      password: Yup.string(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwörter stimmen nicht überein'),
    }),
    onSubmit: (values) => console.log(values),
  });
  useEffect(() => {
    if (!data) return;
    setFieldValue('username', data.user.username, false);
    setFieldValue('role', data.user.rolle, false);
  }, [data, setFieldValue]);

  if (loading) return <LoadingSpinner />;

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
              <Select
                id="role"
                name="role"
                {...getFieldProps('role')}
              >
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
            <FormControl className={classes.input}>
              <InputLabel htmlFor="password">Passwort</InputLabel>
              <Input
                id="password"
                {...getFieldProps('password')}
              />
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="passwordConfirmation">Passwort wiederholen</InputLabel>
              <Input
                id="passwordConfirmation"
                {...getFieldProps('passwordConfirmation')}
              />
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={clsx(classes.root, classes.submitBox)}>
            <Button color="primary" type="submit">Abschicken</Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
