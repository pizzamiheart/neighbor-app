import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
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
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
});

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" component={Link} to="/" edge="start">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Neighbor
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;