import React, { useRef, useState } from 'react';
import { Button, makeStyles, Typography, Grid, Paper } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AlertDialog from './AlertDialog';
import template from '../../../assets/schueler/template.csv';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    marginTop: theme.spacing(2),
  },
  paper: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: theme.spacing(15),
  },
}));

const UPLOAD_SCHUELER = gql`
  mutation UploadSchueler($file: Upload!) {
    uploadSchueler(file: $file) {
      schuelerCount
    }
  }
`;

export default () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [csv, setCsv] = useState(undefined);

  const [uploadSchueler, { loading }] = useMutation(UPLOAD_SCHUELER);

  const fileInput = useRef();
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (!validity.valid) return;
    setCsv(file);
    setOpen(true);
  };

  const submit = () => {
    uploadSchueler({ variables: { file: csv } }).then(() => setOpen(false));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.title}>
            Schülerupload
          </Typography>
          <Typography color="error">Achtung: Dabei gehen alle Schülerdaten verloren!</Typography>
          <Button
            className={classes.uploadButton}
            component="label"
            variant="contained"
            color="primary"
          >
            Schülerdaten hochladen
            <input
              type="file"
              onChange={onChange}
              accept="text/csv"
              className={classes.input}
              ref={fileInput}
            />
          </Button>
          <AlertDialog setOpen={setOpen} submit={submit} open={open} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.title}>
            Vorlage zum Upload
          </Typography>
          <Typography>Laden Sie hier die Vorlage für die Schülerdaten herunter.</Typography>
          <Button
            className={classes.uploadButton}
            variant="contained"
            color="primary"
            component="a"
            href={template}
          >
            Herunterladen
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
