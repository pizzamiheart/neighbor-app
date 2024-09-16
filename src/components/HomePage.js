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
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Neighbor AI
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph sx={{ mb: 4, fontWeight: 'bold' }}>
        The always-available tech assistant for older tech users
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/message" 
          startIcon={<ChatIcon />}
          size="large"
          sx={{ width: '40%' }}
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
          sx={{ width: '40%' }}
        >
          Call Neighbor
        </Button>
      </Stack>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 6, mb: 2 }}>
        The Problem with Tech Support
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Stack spacing={1}>
          <Typography variant="body1">• Too many tech support numbers to keep up with</Typography>
          <Typography variant="body1">• Business hours are limited</Typography>
          <Typography variant="body1">• Family members are helpful, but getting quick answers is hard</Typography>
        </Stack>
      </Paper>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 6, mb: 2 }}>
        Meet Neighbor
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="body1">• One number to call, one place to chat</Typography>
          <Typography variant="body1">• Infinite business hours, always-available to help</Typography>
          <Typography variant="body1">• Quick answers from our friendly AI</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default HomePage;