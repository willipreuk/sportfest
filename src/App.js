import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import Login from './routes/Login';
import Home from './routes/Home';
import Disziplinen from './routes/Disziplinen';
import Ergebnisse from './routes/Ergebnisse';
import Klassen from './routes/Klassen';
import Massstaebe from './routes/Massstaebe';
import Profil from './routes/Profil';
import Schueler from './routes/Schueler';
import User from './routes/User';
import ApolloClient from './ApolloClient';
import store from './store';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Provider store={store}>
        <ApolloProvider client={ApolloClient}>
          <BrowserRouter>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute Component={Home} path="/" exact />
              <PrivateRoute Component={Disziplinen} path="/disziplinen" />
              <PrivateRoute Component={Ergebnisse} path="/ergebnisse" />
              <PrivateRoute Component={Klassen} path="/klassen" />
              <PrivateRoute Component={Massstaebe} path="/massstaebe" />
              <PrivateRoute Component={Profil} path="/profil" />
              <PrivateRoute Component={Schueler} path="/schueler" />
              <PrivateRoute Component={User} path="/user" />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
