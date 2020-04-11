import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { AccountCircle, Face } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { logout as logoutAction } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    width: '15em',
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { username, rolle } = useSelector((state) => state.user);

  const [anchorElement, setAnchorElement] = useState(null);
  const handleClick = useCallback((event) => setAnchorElement(event.currentTarget), [
    setAnchorElement,
  ]);
  const handleClose = useCallback(() => setAnchorElement(null), [setAnchorElement]);

  const logout = useCallback(() => {
    handleClose();
    dispatch(logoutAction());
  }, [handleClose, dispatch]);
  const editUser = useCallback(() => {
    handleClose();
    dispatch(push(`/user/${username}`));
  }, [handleClose, dispatch, username]);

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        disableAutoFocusItem
        open={!!anchorElement}
        onClose={handleClose}
        anchorEl={anchorElement}
      >
        <MenuItem button={false} className={classes.listItem}>
          <ListItemAvatar>
            <Face />
          </ListItemAvatar>
          <ListItemText primary={username} secondary={rolle} />
        </MenuItem>
        <Divider className={classes.divider} component="li" />
        <MenuItem className={classes.listItem} onClick={editUser}>
          Nutzerdaten ändern
        </MenuItem>
        <MenuItem className={classes.listItem} onClick={logout}>
          Abmelden
        </MenuItem>
      </Menu>
    </>
  );
};
