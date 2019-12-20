import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import {
  makeStyles, Avatar, Button, Container, TextField, Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LOGIN = gql`
    mutation login($user: String!, $password: String!){
        login(username: $user, password: $password) {
            jwt
        }
    }
`;

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error, data }] = useMutation(LOGIN, { onError: () => null });

  if (data) {
    localStorage.setItem('jwt', data.login.jwt);
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Anmelden
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Nutzername"
            name="user"
            autoComplete="user"
            autoFocus
            error={!!error}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!error}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => login({ variables: { user, password } })}
          >
            Einloggen
          </Button>
        </form>
      </div>
    </Container>
  );
}
