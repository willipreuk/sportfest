import { useCallback, useEffect, useState } from 'react';

export default (deps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, deps); // eslint-disable-line

  const onChangePage = useCallback((e, newPage) => setPage(newPage), []);
  const onChangeRows = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  return {
    page, rowsPerPage, onChangePage, onChangeRows,
  };
};
