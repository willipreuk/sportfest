import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Container, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import { setError } from '../actions/uiState';

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
  error: {
    backgroundColor: theme.palette.error.main,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.uiState.error);

  const handleClose = () => {
    dispatch(setError());
  };

  return (
    <>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error}>
            <SnackbarContent
              message={error}
              className={classes.error}
              action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          </Snackbar>
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
