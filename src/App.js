import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import clsx from 'clsx';
import { Close as CloseIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PrivateRoute from './components/PrivateRoute';
import Login from './routes/Login';
import Disziplinen from './routes/Disziplinen';
import DisziplinenCreate from './routes/Disziplinen/Create';
import DisziplinenEdit from './routes/Disziplinen/Edit';
import Ergebnisse from './routes/Ergebnisse';
import Klassen from './routes/Klassen';
import KlassenEdit from './routes/Klassen/Edit';
import KlassenCreate from './routes/Klassen/Create';
import Massstaebe from './routes/Massstaebe';
import Profil from './routes/Profil';
import Schueler from './routes/Schueler';
import User from './routes/User';
import UserEdit from './routes/User/Edit';
import UserCreate from './routes/User/Create';
import Schreiber from './routes/Schreiber';
import ErgebnisseKlasse from './routes/Ergebnisse/klasse';
import { setNotification } from './actions/uiState';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.main,
  },
  sucess: {
    backgroundColor: theme.palette.success.main,
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.uiState.error);

  const handleClose = () => {
    dispatch(setNotification());
  };

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        {error ? (
          <SnackbarContent
            message={error.message}
            className={clsx(
              error.level === 'success' && classes.sucess,
              error.level === 'error' && classes.error,
            )}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : null}
      </Snackbar>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute Component={Disziplinen} path="/disziplinen" exact />
        <PrivateRoute Component={DisziplinenCreate} path="/disziplinen/create" />
        <PrivateRoute Component={DisziplinenEdit} path="/disziplinen/:id" />
        <PrivateRoute Component={Ergebnisse} path="/ergebnisse" exact />
        <PrivateRoute Component={Klassen} path="/klassen" exact />
        <PrivateRoute Component={KlassenCreate} path="/klassen/create" exact />
        <PrivateRoute Component={KlassenEdit} path="/klassen/:id" />
        <PrivateRoute Component={Massstaebe} path="/massstaebe" />
        <PrivateRoute Component={Profil} path="/profil" />
        <PrivateRoute Component={Schueler} path="/schueler" />
        <PrivateRoute Component={User} path="/user" exact />
        <PrivateRoute Component={UserCreate} path="/user/create" />
        <PrivateRoute Component={UserEdit} path="/user/:username" />
        <PrivateRoute
          Component={Schreiber}
          path="/ergebnisse/schreiber"
          layout={false}
          reqRole="none"
          exact
        />
        <PrivateRoute
          Component={ErgebnisseKlasse}
          path="/ergebnisse/klassen"
          layout={false}
          exact
        />
        <Redirect from="/" to="/ergebnisse" />
      </Switch>
    </>
  );
}

export default App;
