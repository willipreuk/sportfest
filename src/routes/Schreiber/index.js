import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Init from './Init';
import Eintragen from './Eintragen';
import SchreiberContainer from '../../components/Schreiber/SchreiberContainer';

const useStyles = makeStyles(() => ({
  heading: {
    textAlign: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const { disziplin, klasse } = useSelector((state) => state.schreiber);

  return (
    <SchreiberContainer>
      {!disziplin || !klasse ? (
        <>
          <Typography variant="h5" className={classes.heading}>
            Giebichenstein-Gymnasium &quot;Thomas Müntzer&quot;
          </Typography>
          <Init />
        </>
      ) : (
        <Eintragen />
      )}
    </SchreiberContainer>
  );
};
