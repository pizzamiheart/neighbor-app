import React from 'react';
import { 
  Typography, Button, Box, Stack, useTheme, useMediaQuery, Paper, Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container disableGutters maxWidth={false} sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'stretch',
      px: { xs: 2, sm: 3, md: 4 },
      py: 3,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <Typography variant={isMobile ? "h4" : "h3"} align="center" gutterBottom>
        Neighbor
      </Typography>
      <Typography variant="subtitle1" align="center" paragraph sx={{ fontWeight: 'bold', mb: 2 }}>
        The always-available tech assistant for older adults
      </Typography>
      
      <Stack spacing={2} sx={{ mb: 3, maxWidth: { sm: '400px' }, mx: 'auto', width: '100%' }}>
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
      <Paper elevation={3} sx={{ p: 2, mb: 3, maxWidth: { sm: '600px' }, mx: 'auto', width: '100%' }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">Too many tech support numbers to keep up with</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">Business hours are limited</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">Family members are helpful, but getting quick answers is hard</Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Meet Neighbor
      </Typography>
      <Paper elevation={3} sx={{ p: 2, maxWidth: { sm: '600px' }, mx: 'auto', width: '100%' }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">One number to call, one place to chat</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">Infinite business hours, always available to help</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <KeyboardArrowRightIcon color="primary" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
            <Typography variant="body1">Quick answers from our friendly AI</Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default HomePage;
