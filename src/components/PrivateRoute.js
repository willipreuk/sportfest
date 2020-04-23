import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout';
import { logout } from '../actions/user';

const PrivateRoute = ({ path, Component, exact, reqRole, layout }) => {
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
          <>
            {layout ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              <Component />
            )}
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
