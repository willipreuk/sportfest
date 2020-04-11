import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import EnhancedToolbar from './EnhancedToolbar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 585,
  },
});

const DataTable = ({
  columns,
  rows,
  filter,
  title,
  total,
  rowsPerPageOptions,
  page,
  onChangePage,
  rowsPerPage,
  onChangeRows,
  labelRowsPerPage,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <EnhancedToolbar filter={filter} title={title} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label={title}>
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
              <TableRow hover tabIndex={-1} key={row.id}>
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
        count={total}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRows}
        labelRowsPerPage={labelRowsPerPage}
      />
    </Paper>
  );
};
DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      minWidth: PropTypes.number.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  filter: PropTypes.element,
  total: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangeRows: PropTypes.func.isRequired,
  labelRowsPerPage: PropTypes.string.isRequired,
};
DataTable.defaultProps = {
  filter: null,
};

export default DataTable;
