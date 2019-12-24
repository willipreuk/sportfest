import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  checkbox: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const UPDATE_SCHUELER = gql`
  mutation UpdateSchueler($id: Int!, $status: String) {
    updateSchueler(id: $id, status: $status) {
      status
      id
    }
  }
`;

const StatusCheckbox = ({ status, id }) => {
  const classes = useStyles();
  const [updateSchueler] = useMutation(UPDATE_SCHUELER);
  const [checked, setChecked] = useState(status === 'E');
  return (
    <Checkbox
      className={classes.checkbox}
      onChange={() => updateSchueler({ variables: { status: checked ? null : 'E', id } })
        .then((res) => setChecked(res.data.updateSchueler.status))}
      checked={checked}
    />
  );
};
StatusCheckbox.propTypes = {
  status: PropTypes.string,
  id: PropTypes.number.isRequired,
};
StatusCheckbox.defaultProps = {
  status: null,
};

export default StatusCheckbox;
