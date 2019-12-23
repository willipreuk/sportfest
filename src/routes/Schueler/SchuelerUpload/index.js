import {
  Button, makeStyles, Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../../../components/LoadingSpinner';

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

  const [uploadSchueler, { loading }] = useMutation(UPLOAD_SCHUELER);

  const fileInput = useRef();
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && uploadSchueler({ variables: { file } });

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Typography variant="h6" className={classes.title}>Schülerupload</Typography>
      <Typography color="error">
        Achtung: Wenn eine neue Tabelle mit Schülern hochgeladen wird, werden alle Ergebnisse,
        welche mit den alten Schülern verknüpft waren ebenfalls gelöscht.
      </Typography>
      <Button
        className={classes.uploadButton}
        component="label"
        variant="contained"
        color="primary"
      >
        Schülerdaten auswählen
        <input type="file" onChange={onChange} accept="text/csv" className={classes.input} ref={fileInput} />
      </Button>
    </>
  );
};
