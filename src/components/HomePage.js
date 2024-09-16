import React from 'react';
import { 
  Typography, Button, Box, Stack, useTheme, useMediaQuery, Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        width: '100%', 
        maxWidth: isMobile ? '100%' : '800px', // Adjust max width for desktop
        mx: 'auto', // Center the content horizontally
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'stretch' 
      }}
    >
      <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Neighbor AI
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph sx={{ mb: 2, fontWeight: 'bold' }}>
        The always-available tech assistant specifically for older adults
      </Typography>
      
      <Stack 
        direction={isMobile ? "column" : "row"} // Stack vertically on mobile
        spacing={2} 
        sx={{ 
          mb: 3, 
          justifyContent: 'center',
          alignItems: 'center' // Center buttons on mobile
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/message" 
          startIcon={<ChatIcon />}
          size="large"
          sx={{ 
            width: isMobile ? '80%' : '45%', // Adjust width for mobile
            maxWidth: '250px' // Slightly larger button on desktop
          }}
        >
          Chat with Neighbor
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          component={Link} 
          to="/call" 
          startIcon={<PhoneIcon />}
          size="large"
          sx={{ 
            width: isMobile ? '80%' : '45%', // Adjust width for mobile
            maxWidth: '250px' // Slightly larger button on desktop
          }}
        >
          Call Neighbor
        </Button>
      </Stack>

      {/* New tagline added here */}
      <Typography 
        variant="body1" 
        align="center" 
        paragraph 
        sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary' }}
      >
        Designed with simplicity in mind, for those who want quick and friendly tech help at any time.
      </Typography>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 3, mb: 1 }}>
        The Problem with Tech Support
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Stack spacing={1}>
          <Typography variant="body1" align="center">Too many tech support numbers to keep up with</Typography>
          <Typography variant="body1" align="center">Business hours are limited</Typography>
          <Typography variant="body1" align="center">Family members are helpful, but getting quick answers is hard</Typography>
        </Stack>
      </Paper>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 3, mb: 1 }}>
        Meet Neighbor
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body1" align="center">One number to call, one place to chat</Typography>
          <Typography variant="body1" align="center">Infinite business hours, always available to help</Typography>
          <Typography variant="body1" align="center">Quick answers from our friendly AI</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default HomePage;
