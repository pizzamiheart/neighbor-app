// Layout.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import theme from '../theme'; // Import the custom theme

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Neighbor</Typography>
            <Button color="inherit" component={Link} to="/" size="small">Home</Button>
            <Button color="inherit" component={Link} to="/message" size="small">Chat</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, width: '100%', maxWidth: '100%' }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
