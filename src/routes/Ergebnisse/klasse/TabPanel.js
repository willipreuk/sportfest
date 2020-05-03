import React from 'react';
import PropTypes from 'prop-types';
import { Container, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const TabPanel = ({ children, value, index, ...other }) => {
  const classes = useStyles();
  return (
    <Container
      className={classes.root}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      role="tabpanel"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <Paper className={classes.paper}>{value === index && children}</Paper>
    </Container>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
