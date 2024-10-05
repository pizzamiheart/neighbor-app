import React from 'react';
import { 
  Typography, Button, Box, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
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
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 4, sm: 5, md: 6 },
      boxSizing: 'border-box',
      bgcolor: 'background.default'
    }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ 
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        mb: { xs: 2, sm: 3, md: 4 }
      }}>
        Welcome to Neighbor
      </Typography>
      <Typography variant="h5" align="center" paragraph sx={{ 
        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
        mb: { xs: 3, sm: 4, md: 5 }
      }}>
        The always-available tech support assistant for older adults.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 5 } }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ChatIcon />}
          component={Link}
          to="/message"
          size={isMobile ? "large" : "medium"}
          fullWidth={isMobile}
          sx={{ minWidth: { sm: '200px' } }}
        >
          Start Chat
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PhoneIcon />}
          component={Link}
          to="/call"
          size={isMobile ? "large" : "medium"}
          fullWidth={isMobile}
          sx={{ minWidth: { sm: '200px' } }}
        >
          Start Call
        </Button>
      </Stack>
      <Stack spacing={2} sx={{ maxWidth: '600px', width: '100%' }}>
        {['One number to call, one place to chat', 
          'Infinite business hours, always available to help', 
          'Quick answers from our friendly AI'].map((text, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <CheckCircleIcon color="success" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1" sx={{ 
              textAlign: 'left',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
            }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default HomePage;