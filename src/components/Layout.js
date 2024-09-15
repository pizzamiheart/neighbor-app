import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Make sure to export the theme from HomePage.js or create a separate theme file

function Layout({ children, title }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Neighbor AI
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/message">Chat</Button>
            <Button color="inherit" component={Link} to="/call">Call</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;