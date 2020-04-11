import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from '@material-ui/core';
import RankingItem from './RankingItem';

const Best = ({ title, data }) => (
  <>
    <Typography variant="h6">{title}</Typography>
    <List>
      {data.map((item, i) => (
        <RankingItem key={item.id} punkte={item.punkte} ranking={i} name={item.name} />
      ))}
    </List>
  </>
);
Best.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      punkte: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Best;
