import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout';
import { logout } from '../actions/user';

const PrivateRoute = ({
  path, Component, exact, reqRole,
}) => {
  const dispatch = useDispatch();
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
          <Layout><Component /></Layout>
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
};
PrivateRoute.defaultProps = {
  exact: false,
  reqRole: 'admin',
};

export default PrivateRoute;
