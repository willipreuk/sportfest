import React, { useEffect, useState } from 'react';
import {
  makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoadingSpinner from '../../components/LoadingSpinner';
import EnhancedToolbar from './EnhancedToolbar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 585,
  },
});

const ALL_SCHUELER = gql`
    query Schueler($klasse: Int, $offset: Int, $limit: Int) { 
        allSchueler(idklasse: $klasse, offset: $offset, limit: $limit) {
            total
            schueler {
              vorname
              nachname
              klasse {
                  stufe
                  name
              }
            }
        }
    }
`;

const columns = [
  { id: 'vorname', label: 'Vorname', minWidth: 170 },
  { id: 'nachname', label: 'Nachname', minWidth: 100 },
  { id: 'klasse', label: 'Klasse', minWidth: 170 },
];

const createData = (s) => {
  const schueler = { ...s };
  schueler.klasse = `${s.klasse.stufe}/${s.klasse.name}`;
  return schueler;
};

export default function StickyHeadTable() {
  const classes = useStyles();
  const [klasse, setKlasse] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    setPage(0);
    setRowsPerPage(10);
  }, [klasse]);

  const { data, loading } = useQuery(
    ALL_SCHUELER,
    {
      variables: {
        klasse: klasse !== 0 ? klasse : undefined,
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
    },
  );
  if (loading) return <LoadingSpinner />;

  const rows = data.allSchueler.schueler.map((s) => createData(s));

  return (
    <Paper className={classes.root}>
      <EnhancedToolbar title="Schülerliste" klasse={klasse} setKlasse={setKlasse} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="Schülerliste">
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
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={data.allSchueler.total}
        rowsPerPageOptions={[10, 30, 90]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(e, newPage) => setPage(newPage)}
        onChangeRowsPerPage={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Schüler pro Seite:"
      />
    </Paper>
  );
}
