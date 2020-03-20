import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import LoadingSpinner from './LoadingSpinner';

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
  const loading = useSelector((state) => state.uiState.loading);
  const classes = useStyles();
  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {loading ? <LoadingSpinner /> : children}
        </Container>
      </main>
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
