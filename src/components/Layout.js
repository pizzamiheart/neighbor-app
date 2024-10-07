import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Layout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {isHomePage && (
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/auth" onClick={handleClose}>Sign In / Sign Up</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem component={Link} to="/payment" onClick={handleClose}>Upgrade</MenuItem>
          </Menu>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, width: '100%', maxWidth: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
