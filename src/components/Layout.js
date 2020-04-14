import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Container,
  Snackbar,
  SnackbarContent,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
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
  sucess: {
    backgroundColor: theme.palette.success.main,
  },
  loading: {
    zIndex: theme.zIndex.tooltip + 1,
    color: '#fff',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.uiState);

  const handleClose = () => {
    dispatch(setError());
  };

  return (
    <>
      <Backdrop open={loading} timeout={10} className={classes.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
