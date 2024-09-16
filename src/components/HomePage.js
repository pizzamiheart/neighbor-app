import React from 'react';
import { 
  Typography, Button, Box, Grid, Card, CardContent, useMediaQuery, useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
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
    <Box sx={{ width: '100%', bgcolor: 'background.paper', px: 2 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4, fontSize: { xs: '2rem', sm: '3rem' } }}>
        Tech Support Made Easy, All in One Place
      </Typography>
      <Typography variant="h5" align="center" paragraph sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
        Neighbor AI: Your always-available tech assistant for older tech users
      </Typography>
      
      <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
        {['For Older Tech Users', 'For Family Members'].map((title, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card raised sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <Box sx={{ mb: 2 }}>
                  {index === 0 ? <AccessTimeFilledIcon sx={{ mr: 1 }} /> : <FamilyRestroomIcon sx={{ mr: 1 }} />}
                  <Typography variant="body1" component="span">
                    {index === 0 ? '24/7 Tech Support' : 'Save Time and Stress'}
                  </Typography>
                </Box>
                <Box>
                  <SupportAgentIcon sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span">
                    {index === 0 ? 'Patient, Clear Guidance' : 'Reliable Help for Your Loved Ones'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {['Chat with Neighbor', 'Call Neighbor'].map((text, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to={index === 0 ? "/message" : "/call"}
              fullWidth 
              startIcon={index === 0 ? <ChatIcon /> : <PhoneIcon />}
              sx={{ py: 2 }}
            >
              {text}
            </Button>
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h4" align="center" gutterBottom>
        Why Choose Neighbor?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[
          { icon: AccessTimeFilledIcon, title: 'Always Available', desc: 'No wait times, infinite business hours' },
          { icon: SupportAgentIcon, title: 'Patient Guidance', desc: 'Clear, step-by-step instructions' },
          { icon: FamilyRestroomIcon, title: 'Free Up Your Time', desc: 'Get fast reliable help, and get back to your day' }
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <item.icon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">{item.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
          {['Message', 'Call'].map((text, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                {index === 0 ? <ChatIcon sx={{ fontSize: 60, color: 'primary.main' }} /> : <PhoneIcon sx={{ fontSize: 60, color: 'primary.main' }} />}
                <Typography variant="h6">{text}</Typography>
                <Typography variant="body2">
                  {index === 0 ? 'Chat with Neighbor to find the solution' : 'Call Neighbor and get instant help from your AI assistant'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;