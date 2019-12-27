import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';

const PrivateRoute = ({ path, Component, exact }) => {
  const jwt = useSelector((state) => state.user.jwt);
  return <Route exact={exact} path={path} render={() => (jwt ? <Layout><Component /></Layout> : <Redirect to="/login" />)} />;
};
PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};
PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
