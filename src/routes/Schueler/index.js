import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import Table from './Table';
import SchuelerUpload from './SchuelerUpload';

const useStyles = makeStyles((theme) => ({
  upload: {
    marginTop: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <>
      <Table />
      <Box className={classes.upload}>
        <SchuelerUpload />
      </Box>
    </>
  );
};
