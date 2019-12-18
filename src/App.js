import React from 'react';
import { CssBaseline, makeStyles, Container } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Navigation from './components/Navigation';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <ApolloProvider client={client}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <h1>Sportfest</h1>
          </Container>
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
