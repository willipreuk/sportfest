import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

export default () => {
  const { schueler } = useSelector((state) => state.schreiber);
  return (
    <Dialog open>
      <DialogTitle>Station abgeschlossen</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Alle Schüler, welche nicht krank sind haben jetzt 3 Versuche absolviert.
          Unten werden die einzelnen Werte noch einmal angezeigt.
        </DialogContentText>
        <Table>
          <TableHead>
            <TableRow>
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
    </Dialog>
  );
};
