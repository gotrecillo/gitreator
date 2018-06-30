import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        GiTreator
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
