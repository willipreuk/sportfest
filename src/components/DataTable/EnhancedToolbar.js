import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedToolbar = ({ title, filter }) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {title}
      </Typography>
      {filter}
    </Toolbar>
  );
};
EnhancedToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.element,
};
EnhancedToolbar.defaultProps = {
  filter: null,
};

export default EnhancedToolbar;
