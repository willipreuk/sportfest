import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import Disziplinen from './routes/Disziplinen';
import Ergebnisse from './routes/Ergebnisse';
import Klassen from './routes/Klassen';
import Massstaebe from './routes/Massstaebe';
import Profil from './routes/Profil';
import Schueler from './routes/Schueler';
import User from './routes/User';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

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
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/disziplinen">
              <Disziplinen />
            </Route>
            <Route path="/ergebnisse">
              <Ergebnisse />
            </Route>
            <Route path="/klassen">
              <Klassen />
            </Route>
            <Route path="/massstaebe">
              <Massstaebe />
            </Route>
            <Route path="/profil">
              <Profil />
            </Route>
            <Route path="/schueler">
              <Schueler />
            </Route>
            <Route path="/user">
              <User />
            </Route>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
