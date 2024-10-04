import React from 'react';
import { 
  Typography, Button, Box, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      px: { xs: 1, sm: 2 },
      py: 3,
      boxSizing: 'border-box',
      bgcolor: 'background.default'
    }}>
      <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom>
        Neighbor
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph sx={{ fontWeight: 'bold', mb: 2 }}>
        The always-available tech assistant for older adults.
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 3, width: '100%', maxWidth: 400, mx: 'auto' }}>
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

      <Typography 
        variant="body2" 
        align="center" 
        sx={{ fontStyle: 'italic', mb: 3, color: 'text.secondary' }}
      >
        Designed with simplicity in mind, for those who want quick and friendly tech help at any time.
      </Typography>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, mb: 1 }}>
        The Problem with Tech Support
      </Typography>
      <Box sx={{ p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CancelIcon color="error" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Too many tech support numbers to keep up with</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CancelIcon color="error" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Business hours are limited</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CancelIcon color="error" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Family members are helpful, but getting quick answers is hard</Typography>
          </Box>
        </Stack>
      </Box>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Meet Neighbor
      </Typography>
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CheckCircleIcon color="success" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>One number to call, one place to chat</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CheckCircleIcon color="success" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Infinite business hours, always available to help</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CheckCircleIcon color="success" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ textAlign: 'left' }}>Quick answers from our friendly AI</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default HomePage;