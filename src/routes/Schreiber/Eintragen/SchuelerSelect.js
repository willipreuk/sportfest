import React, { useCallback, useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { setCurrentSchueler } from '../../../actions/schreiber';
import useLoadingQuery from '../../../hooks/useLoadingQuery';

const GET_SCHUELER = gql`
  query($klasse: Int) {
    allSchueler(idklasse: $klasse) {
      schueler {
        nachname
        vorname
        id
      }
    }
  }
`;

export default () => {
  const klasse = useSelector((state) => state.schreiber.klasse);
  const loading = useSelector((state) => state.uiState.loading);
  const dispatch = useDispatch();
  const { data } = useLoadingQuery(GET_SCHUELER, { variables: { klasse } });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(
    (id) => () => {
      dispatch(setCurrentSchueler(id));
      setAnchorEl(null);
    },
    [dispatch, setAnchorEl],
  );

  if (loading || !data) return null;

  return (
    <>
      <Button
        variant="outlined"
        aria-controls="schueler-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Schüler auswählen
      </Button>
      <Menu
        id="schueler-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {data.allSchueler.schueler.map((s) => (
          <MenuItem key={s.id} onClick={handleClick(s.id)}>{`${s.vorname} ${s.nachname}`}</MenuItem>
        ))}
      </Menu>
    </>
  );
};
