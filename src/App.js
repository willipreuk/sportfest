import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './components/PrivateRoute';
import Login from './routes/Login';
import Home from './routes/Home';
import Disziplinen from './routes/Disziplinen';
import DisziplinenCreate from './routes/Disziplinen/Create';
import DisziplinenEdit from './routes/Disziplinen/Edit';
import Ergebnisse from './routes/Ergebnisse';
import Klassen from './routes/Klassen';
import Massstaebe from './routes/Massstaebe';
import Profil from './routes/Profil';
import Schueler from './routes/Schueler';
import User from './routes/User';
import UserEdit from './routes/User/Edit';
import UserCreate from './routes/User/Create';
import Schreiber from './routes/Schreiber';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute Component={Home} path="/" exact />
      <PrivateRoute Component={Disziplinen} path="/disziplinen" exact />
      <PrivateRoute Component={DisziplinenCreate} path="/disziplinen/create" />
      <PrivateRoute Component={DisziplinenEdit} path="/disziplinen/:id" />
      <PrivateRoute Component={Ergebnisse} path="/ergebnisse" exact />
      <PrivateRoute Component={Klassen} path="/klassen" />
      <PrivateRoute Component={Massstaebe} path="/massstaebe" />
      <PrivateRoute Component={Profil} path="/profil" />
      <PrivateRoute Component={Schueler} path="/schueler" />
      <PrivateRoute Component={User} path="/user" exact />
      <PrivateRoute Component={UserCreate} path="/user/create" />
      <PrivateRoute Component={UserEdit} path="/user/:username" />
      <PrivateRoute Component={Schreiber} path="/ergebnisse/schreiber" layout={false} reqRole="none" />
    </Switch>

  );
}

export default App;
