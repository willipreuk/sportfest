import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Checkbox } from '@material-ui/core';

const UPDATE_SCHUELER = gql`
  mutation UpdateSchueler($id: Int!, $status: String) {
    updateSchueler(id: $id, status: $status) {
      status
      id
    }
  }
`;

const StatusCheckbox = ({ status, id }) => {
  const [updateSchueler] = useMutation(UPDATE_SCHUELER);
  const [checked, setChecked] = useState(status === 'E');
  return (
    <Checkbox
      onChange={() => updateSchueler({ variables: { status: checked ? null : 'E', id } })
        .then((res) => setChecked(res.data.updateSchueler.status))}
      checked={checked}
    />
  );
};
StatusCheckbox.propTypes = {
  status: PropTypes.string,
  id: PropTypes.string.isRequired,
};
StatusCheckbox.defaultProps = {
  status: null,
};

export default StatusCheckbox;
