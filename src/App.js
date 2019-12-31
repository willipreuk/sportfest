import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
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
import configureStore from './store';
import LoadingSpinner from './components/LoadingSpinner';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const store = configureStore();

function App() {
  const classes = useStyles();
  return (
    <Provider store={store.store}>
      <PersistGate loading={<LoadingSpinner />} persistor={store.persistor}>
        <div className={classes.root}>
          <CssBaseline />
          <ApolloProvider client={ApolloClient}>
            <ConnectedRouter history={store.history}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute Component={Home} path="/" exact />
                <PrivateRoute Component={Disziplinen} path="/disziplinen" />
                <PrivateRoute Component={Ergebnisse} path="/ergebnisse" />
                <PrivateRoute Component={Klassen} path="/klassen" />
                <PrivateRoute Component={Massstaebe} path="/massstaebe" />
                <PrivateRoute Component={Profil} path="/profil" reqRole="none" />
                <PrivateRoute Component={Schueler} path="/schueler" />
                <PrivateRoute Component={User} path="/user" />
              </Switch>
            </ConnectedRouter>
          </ApolloProvider>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
