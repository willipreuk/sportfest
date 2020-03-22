import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import RankingItem from './RankingItem';
import useLoadingQuery from '../../../hooks/useLoadingQuery';

const AUSWERTUNG_SCHUELER = gql`
  query($von: Int!, $bis: Int!) {
    auswertungStufen(von: $von, bis: $bis) {
      bestM {
        schueler {
          id
          vorname
          nachname
          klasse {
            stufe
            name
          }
        }
        punkte
      }
      bestW {
        schueler {
          id
          vorname
          nachname
          klasse {
            stufe
            name
          }
        }
        punkte
      }
    }
  }
`;

const Best = ({ geschlecht }) => {
  const filter = useSelector((state) => state.ergebnis.filter);
  const loading = useSelector((state) => state.uiState.loading);
  const { data } = useLoadingQuery(
    AUSWERTUNG_SCHUELER,
    { variables: { von: filter.von, bis: filter.bis } },
  );

  if (loading || !data) return null;

  const schueler = data.auswertungStufen[geschlecht].slice(0, 5);

  return (
    <>
      <Typography variant="h6">
        {`Beste ${geschlecht === 'bestM' ? 'Jungs' : 'Mädchen'}`}
      </Typography>
      <List>
        {schueler.map((s, i) => (
          <RankingItem
            key={s.schueler.id}
            punkte={s.punkte}
            ranking={i}
            vorname={s.schueler.vorname}
            nachname={s.schueler.nachname}
            klasse={s.schueler.klasse}
          />
        ))}
      </List>
    </>
  );
};
Best.propTypes = {
  geschlecht: PropTypes.oneOf(['bestM', 'bestW']).isRequired,
};

export default Best;
