import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container, Backdrop, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
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
  loading: {
    zIndex: theme.zIndex.tooltip + 1,
    color: '#fff',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const loading = useSelector((state) => state.uiState.loading);

  return (
    <>
      <Backdrop open={loading} timeout={10} className={classes.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
  children: PropTypes.object.isRequired,
};

export default Layout;
