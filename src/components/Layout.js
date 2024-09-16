import React from 'react';
import { Box } from '@mui/material';

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