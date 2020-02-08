import React, { useCallback, useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { setCurrentSchueler } from '../../actions/schreiber';

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
  const dispatch = useDispatch();
  const { data, loading } = useQuery(GET_SCHUELER, { variables: { klasse } });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((id) => () => {
    dispatch(setCurrentSchueler(id));
    setAnchorEl(null);
  }, [dispatch, setAnchorEl]);

  if (loading) return null;
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
