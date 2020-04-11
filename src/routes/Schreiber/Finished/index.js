import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
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
  TableBody,
  DialogActions,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import useSubmit from './useSubmit';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(2),
  },
  header: {
    fontWeight: 700,
  },
}));

const createData = (schueler) =>
  schueler.map((s) => {
    const sData = cloneDeep(s);
    // eslint-disable-next-line no-underscore-dangle
    delete sData.__typename;
    delete sData.klasse;
    return sData;
  });

const verletztSchuelerDisplay = (schueler) => {
  const displayedCells = schueler.ergebnisseSchueler.map((e, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <TableCell key={`${schueler.id}+${e}+${i}`}>{e}</TableCell>
  ));

  for (let i = displayedCells.length; i < 3; i += 1) {
    displayedCells.push(<TableCell key={`${schueler.id}+-+${i}`}>-</TableCell>);
  }
  return displayedCells;
};

export default () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.uiState.loading);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { schueler, disziplin } = useSelector((state) => state.schreiber);
  const { submit } = useSubmit();

  if (loading) return null;

  return (
    <Dialog open>
      <DialogTitle>Station abgeschlossen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Alle Schüler, welche nicht krank sind haben jetzt 3 Versuche absolviert. Unten werden die
          einzelnen Werte noch einmal angezeigt.
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
                {s.status === 'E'
                  ? ['-', '-', '-'].map((e, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableCell key={`${s.id}+${e}+${i}`}>{e}</TableCell>
                    ))
                  : null}
                {s.stationsStatus !== null
                  ? verletztSchuelerDisplay(s)
                  : s.ergebnisseSchueler.map((e, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableCell key={`${s.id}+${e}+${i}`}>{e}</TableCell>
                    ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <CSVLink
          data={createData(schueler)}
          onClick={() => setSubmitDisabled(false)}
          filename={`${schueler[0].klasse.stufe}_${schueler[0].klasse.name}-${disziplin.id}.csv`}
        >
          <Button color="primary">Download</Button>
        </CSVLink>
        <Button color="primary" onClick={() => submit(schueler)} disabled={submitDisabled}>
          Abschicken
        </Button>
      </DialogActions>
    </Dialog>
  );
};
