import React from 'react';
import { useSelector } from 'react-redux';
import Init from './Init';
import Eintragen from './Eintragen';
import SchreiberContainer from '../../components/Schreiber/SchreiberContainer';

export default () => {
  const { disziplin, klasse } = useSelector((state) => state.schreiber);
  return (
    <SchreiberContainer heading={!disziplin || !klasse}>
      {!disziplin || !klasse ? <Init /> : <Eintragen />}
    </SchreiberContainer>
  );
};
