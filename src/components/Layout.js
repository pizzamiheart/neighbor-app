import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define the theme here
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Or whatever color you prefer
    },
    secondary: {
      main: '#ff9800', // Or whatever color you prefer
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h5: {
      fontWeight: 500,
    },
  },
});

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
          {title && <Typography variant="h4" component="h1" gutterBottom>{title}</Typography>}
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;