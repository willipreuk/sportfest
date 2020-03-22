import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';
import Layout from './Layout';
import { logout } from '../actions/user';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({
  path, Component, exact, reqRole, layout,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.uiState.loading);
  const { jwt, rolle } = useSelector((state) => state.user);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (!jwt || (reqRole === 'none' ? false : reqRole !== rolle)) {
          dispatch(logout());
          return <Redirect to="/login" />;
        }
        return (
          <>
            <Backdrop open={loading} timeout={10}>
              <LoadingSpinner />
            </Backdrop>
            {layout ? (
              <Layout>
                <Component />
              </Layout>
            ) : <Component />}
          </>
        );
      }}
    />
  );
};
PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  reqRole: PropTypes.string,
  layout: PropTypes.bool,
};
PrivateRoute.defaultProps = {
  exact: false,
  reqRole: 'admin',
  layout: true,
};

export default PrivateRoute;
