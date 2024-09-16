import React from 'react';
import { 
  Typography, Button, Box, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';

function HomePage() {
  return (
    <Box sx={{ p: 2, maxWidth: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Neighbor!
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph>
        Your personal and always-available tech assistant
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/message"
          startIcon={<ChatIcon />}
          fullWidth
        >
          Chat with Neighbor
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/call"
          startIcon={<PhoneIcon />}
          fullWidth
        >
          Call Neighbor
        </Button>
      </Stack>

      <Typography variant="h5" align="center" gutterBottom>
        Why Choose Neighbor?
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">Always Available</Typography>
          <Typography variant="body2">No wait times, infinite business hours</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Patient Guidance</Typography>
          <Typography variant="body2">Clear, step-by-step instructions</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Free Up Your Time</Typography>
          <Typography variant="body2">Get fast reliable help, and get back to your day</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default HomePage;
