import React from 'react';
import { 
  Typography, Button, Box, Grid, Card, CardContent, useMediaQuery, useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Layout>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', px: 2 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4, fontSize: { xs: '2rem', sm: '3rem' } }}>
        Neighbor AI: Your always-available tech assistant for older tech users
        </Typography>
        
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card raised sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  For Older Tech Users
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <AccessTimeFilledIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">24/7 Tech Support</Typography>
                </Box>
                <Box>
                  <SupportAgentIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">Patient, Clear Guidance</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card raised sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  For Family Members
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <FamilyRestroomIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">Save Time and Stress</Typography>
                </Box>
                <Box>
                  <SupportAgentIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">Reliable Help for Your Loved Ones</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/message" 
              fullWidth 
              startIcon={<ChatIcon />}
              sx={{ py: 2 }}
            >
              Chat with Neighbor
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/call" 
              fullWidth 
              startIcon={<PhoneIcon />}
              sx={{ py: 2 }}
            >
              Call Neighbor
            </Button>
          </Grid>
        </Grid>
        
        <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
          Why Choose Neighbor?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <AccessTimeFilledIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6">Always Available</Typography>
              <Typography variant="body2">No wait times, infinite business hours</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6">Patient Guidance</Typography>
              <Typography variant="body2">Clear, step-by-step instructions</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <FamilyRestroomIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h6">Free Up Your Time</Typography>
              <Typography variant="body2">Get fast reliable help, and get back to your day</Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
            How Neighbor Works
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <HelpOutlineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6">Bring Your Tech Question</Typography>
                <Typography variant="body2">Printer won't print? Zoom link broken? Locked out of an account?</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'center' }}>
                <ChatIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6">Message</Typography>
                <Typography variant="body2">Chat with Neighbor to find the solution</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ textAlign: 'center' }}>
                <PhoneIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6">Call</Typography>
                <Typography variant="body2">Call Neighbor and get instant help from your AI assistant</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}

export default HomePage;