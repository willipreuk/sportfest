import React from 'react';
import {
  makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoadingSpinner from '../../components/LoadingSpinner';

const columns = [
  { id: 'vorname', label: 'Vorname', minWidth: 170 },
  { id: 'nachname', label: 'Nachname', minWidth: 100 },
  { id: 'klasse', label: 'Klasse', minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

const ALL_SCHUELER = gql`
    { 
        allSchueler {
            vorname
            nachname
            klasse {
                stufe
                name
            }
        }
    }
`;

const createData = (s) => {
  const schueler = { ...s };
  schueler.klasse = `${s.klasse.stufe}/${s.klasse.name}`;
  return schueler;
};

export default function StickyHeadTable() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(ALL_SCHUELER);

  if (loading) return <LoadingSpinner />;

  const rows = data.allSchueler.map((s) => createData(s));

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
