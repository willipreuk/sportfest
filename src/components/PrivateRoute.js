import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, Component, exact }) => {
  const jwt = localStorage.getItem('jwt');
  return <Route exact={exact} path={path} render={() => (jwt ? <Component /> : <Redirect to="/login" />)} />;
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
