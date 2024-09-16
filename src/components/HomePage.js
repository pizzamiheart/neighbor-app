import React from 'react';
import { 
  Typography, Button, Box, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', p: 2 }}>
      <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Neighbor AI
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
        the always-available tech assistant for older tech users
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/message" 
          startIcon={<ChatIcon />}
          fullWidth
          size="large"
        >
          Chat with Neighbor
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          component={Link} 
          to="/call" 
          startIcon={<PhoneIcon />}
          fullWidth
          size="large"
        >
          Call Neighbor
        </Button>
      </Stack>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 6, mb: 2 }}>
        Why Choose Neighbor?
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">Always Available</Typography>
          <Typography variant="body2">24/7 tech support, no wait times</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Patient Guidance</Typography>
          <Typography variant="body2">Clear, step-by-step instructions</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Free Up Your Time</Typography>
          <Typography variant="body2">Help for your loved ones when they need it</Typography>
        </Box>
      </Stack>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 6, mb: 2 }}>
        How It Works
      </Typography>
      <Stack spacing={2}>
        <Typography variant="body1">1. Bring your tech question</Typography>
        <Typography variant="body1">2. Chat or call Neighbor</Typography>
        <Typography variant="body1">3. Get clear, patient guidance</Typography>
      </Stack>
    </Box>
  );
}

export default HomePage;