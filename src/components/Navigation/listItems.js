import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import GroupIcon from '@material-ui/icons/Group';
import SportsIcon from '@material-ui/icons/Sports';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ContactsIcon from '@material-ui/icons/Contacts';

const mainItems = [
  { to: '/', icon: <DashboardIcon />, text: 'Home' },
  { to: '/ergebnisse', icon: <PlaylistAddCheckIcon />, text: 'Ergebnisse' },
  { to: '/schueler', icon: <PersonIcon />, text: 'Schüler' },
  { to: '/klassen', icon: <GroupIcon />, text: 'Klassen' },
];
export const mainListItems = (
  <div>
    {mainItems.map((i) => (
      <ListItem button component={Link} to={i.to}>
        <ListItemIcon>
          {i.icon}
        </ListItemIcon>
        <ListItemText primary={i.text} />
      </ListItem>
    ))}
  </div>
);

const secondItems = [
  { to: '/disziplinen', icon: <SportsIcon />, text: 'Disziplinen' },
  { to: '/massstaebe', icon: <FormatListNumberedIcon />, text: 'Maßstäbe' },
  { to: '/user', icon: <ContactsIcon />, text: 'User' },
];

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Einstellungen</ListSubheader>
    {secondItems.map((i) => (
      <ListItem button component={Link} to={i.to}>
        <ListItemIcon>
          {i.icon}
        </ListItemIcon>
        <ListItemText primary={i.text} />
      </ListItem>
    ))}
  </div>
);
