import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem, ListItemText, ListItemIcon, makeStyles,
} from '@material-ui/core';
import first from '../../../assets/ergebnis/icons8-1-24.png';
import second from '../../../assets/ergebnis/icons8-2-24.png';
import third from '../../../assets/ergebnis/icons8-3-24.png';

const useStyles = makeStyles((theme) => ({
  span: {
    paddingLeft: theme.spacing(1),
  },
}));

const showMedal = [0, 1, 2];
const images = [first, second, third];

const RankingItem = ({
  vorname, nachname, ranking, punkte, klasse,
}) => {
  const classes = useStyles();
  const src = showMedal.includes(ranking) ? images[ranking] : null;
  return (
    <ListItem>
      <ListItemIcon>
        {src ? <img src={src} alt="medal" /> : <span className={classes.span}>{`${ranking + 1}.`}</span>}
      </ListItemIcon>
      <ListItemText primary={`${vorname} ${nachname} - ${klasse.stufe}/${klasse.name}`} secondary={punkte} />
    </ListItem>
  );
};

RankingItem.propTypes = {
  nachname: PropTypes.string.isRequired,
  ranking: PropTypes.number.isRequired,
  vorname: PropTypes.string.isRequired,
  punkte: PropTypes.number.isRequired,
  klasse: PropTypes.shape({
    stufe: PropTypes.number.isRequired,
    name: PropTypes.number.isRequired,
  }).isRequired,
};

export default RankingItem;
