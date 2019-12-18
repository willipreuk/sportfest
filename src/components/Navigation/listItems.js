import React from 'react';
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


export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PlaylistAddCheckIcon />
      </ListItemIcon>
      <ListItemText primary="Ergebnisse" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Schüler" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Klassen" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Einstellungen</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <SportsIcon />
      </ListItemIcon>
      <ListItemText primary="Disziplinen" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText primary="Maßstäbe" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <ListItemText primary="User" />
    </ListItem>
  </div>
);
