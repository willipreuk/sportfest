import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { setErgebnisse as dispatchErgebisse } from '../../../actions/schreiber';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 'bold',
  },
  input: {
    paddingLeft: theme.spacing(3),
  },
}));

const ErgebnisseBearbeiten = ({ currentSchueler, einheit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [ergebisse, setErgebnisse] = useState([]);
  useEffect(() => setErgebnisse([...currentSchueler.ergebnisseSchueler]), [
    setErgebnisse,
    currentSchueler,
  ]);

  const onClose = useCallback(() => {
    setOpen(false);
    setErgebnisse([...currentSchueler.ergebnisseSchueler]);
  }, [setOpen, setErgebnisse, currentSchueler]);

  const onSubmit = useCallback(() => {
    dispatch(dispatchErgebisse(currentSchueler.id, ergebisse));
    setOpen(false);
  }, [currentSchueler, ergebisse, setOpen, dispatch]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>bearbeiten</Button>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{`${currentSchueler.vorname} ${currentSchueler.nachname} - Ergebnisse bearbeiten`}</DialogTitle>
        <DialogContent>
          <List>
            {ergebisse.map((ergebiss, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={i} className={classes.bold}>
                <Typography>{i + 1}. Versuch</Typography>
                <TextField
                  className={classes.input}
                  value={ergebisse[i]}
                  type="number"
                  onChange={(e) => {
                    const { value } = e.target;
                    setErgebnisse((prevState) => {
                      const newState = [...prevState];
                      newState[i] = value;
                      return newState;
                    });
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{einheit}</InputAdornment>,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button color="primary" variant="contained" onClick={onSubmit}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ErgebnisseBearbeiten.propTypes = {
  currentSchueler: PropTypes.object.isRequired,
  einheit: PropTypes.string.isRequired,
};

export default ErgebnisseBearbeiten;
