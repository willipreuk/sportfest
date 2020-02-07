import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody, DialogActions, makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import useSubmit from './useSubmit';
import LoadingSpinner from '../../../components/LoadingSpinner';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(2),
  },
  header: {
    fontWeight: 700,
  },
}));

export default () => {
  const classes = useStyles();
  const { schueler } = useSelector((state) => state.schreiber);
  const { submit, loading } = useSubmit();

  if (loading) return <LoadingSpinner />;

  return (
    <Dialog open>
      <DialogTitle>Station abgeschlossen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Alle Schüler, welche nicht krank sind haben jetzt 3 Versuche absolviert.
          Unten werden die einzelnen Werte noch einmal angezeigt.
        </DialogContentText>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>Name</TableCell>
              <TableCell>1. Versuch</TableCell>
              <TableCell>2. Versuch</TableCell>
              <TableCell>3. Versuch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schueler.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{`${s.vorname} ${s.nachname}`}</TableCell>
                {s.status === 'E' ? ['-', '-', '-'].map((e, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={i}>{e}</TableCell>
                )) : null}
                {s.ergebnisseSchueler.map((e, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={e * i}>{e}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => submit(schueler)}>
          Abschicken
        </Button>
      </DialogActions>
    </Dialog>
  );
};
