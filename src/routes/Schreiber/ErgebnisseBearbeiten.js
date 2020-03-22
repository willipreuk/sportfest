import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 'bold',
  },
}
));

const ErgebnisseBearbeiten = ({ currentSchueler }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ergebisse, setErgebnisse] = useState([]);
  useEffect(
    () => setErgebnisse([...currentSchueler.ergebnisseSchueler]),
    [setErgebnisse, currentSchueler],
  );

  const onClose = useCallback(() => {
    setOpen(false);
    setErgebnisse([...currentSchueler.ergebnisseSchueler]);
  }, [setOpen, setErgebnisse, currentSchueler]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>bearbeiten</Button>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{`${currentSchueler.vorname} ${currentSchueler.nachname} - Ergebnisse bearbeiten`}</DialogTitle>
        <DialogContent>
          <List>
            {ergebisse.map((ergebiss, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${ergebiss}+${i}`}>
                <ListItem className={classes.bold}>
                  {i + 1}
                . Versuch
                </ListItem>
                <ListItem>
                  <TextField
                    value={ergebisse[i]}
                    onChange={(e) => setErgebnisse((prevState) => {
                      const newState = [...prevState];
                      newState[i] = e.target.value;
                      return newState;
                    })}
                  />
                </ListItem>
              </div>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button color="primary" variant="contained">Okay</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ErgebnisseBearbeiten.propTypes = {
  currentSchueler: PropTypes.object.isRequired,
};

export default ErgebnisseBearbeiten;
