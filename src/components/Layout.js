import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
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

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Layout;
