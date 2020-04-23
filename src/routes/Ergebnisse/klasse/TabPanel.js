import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';

const TabPanel = ({ children, value, id, ...other }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography component="div" role="tabpanel" hidden={value !== id} id={id} {...other}>
      {value === id && <Box p={3}>{children}</Box>}
    </Typography>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
