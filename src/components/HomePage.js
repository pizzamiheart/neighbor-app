import React from 'react';
import { 
  Typography, Button, Box, Grid, useTheme, useMediaQuery, Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const positivePoints = [
    'One number to call, one place to chat',
    'Infinite business hours, always available to help',
    'Quick answers from our friendly AI'
  ];

  const negativePoints = [
    'Too many tech support numbers to keep up with',
    'Business hours are limited',
    'Family members are helpful, but getting quick answers is hard'
  ];

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
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: { xs: 4, sm: 5 } }}>
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
          Chat with Neighbor
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
          Call Neighbor
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ maxWidth: '900px', width: '100%' }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Common Tech Support Frustrations
            </Typography>
            {negativePoints.map((text, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CancelIcon color="error" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ 
                  textAlign: 'left',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Neighbor's Solutions
            </Typography>
            {positivePoints.map((text, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mt: 0.5, mr: 1, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ 
                  textAlign: 'left',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;