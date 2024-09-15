import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, CardActions, 
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // A friendly blue color
    },
    secondary: {
      main: '#ff9800', // An energetic orange for accents
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h5: {
      fontWeight: 500,
    },
  },
});

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Neighbor AI
            </Typography>
            <Button color="inherit" component={Link} to="/message">Chat</Button>
            <Button color="inherit" component={Link} to="/call">Call</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Tech Support Made Easy, All in One Place
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Neighbor AI: Your always-available tech assistant for older tech users
          </Typography>
          
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card raised sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    For Older Tech Users
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><AccessTimeFilledIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="24/7 Tech Support" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><SupportAgentIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Patient, Clear Guidance" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button size="large" variant="contained" color="primary" component={Link} to="/message" fullWidth>
                    Start Chat
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card raised sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    For Family Members
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><FamilyRestroomIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Save Time and Stress" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><SupportAgentIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Reliable Help for Your Loved Ones" />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <Button size="large" variant="contained" color="primary" component={Link} to="/call" fullWidth>
                    Start Call
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          
          <Typography variant="h5" align="center" gutterBottom>
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
                <Typography variant="body2">When your parent needs help printing, they can call their Neighbor</Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              How Neighbor Works
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <HelpOutlineIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  <Typography variant="h6">1. Bring Your Tech Question or Problem</Typography>
                  <Typography variant="body2">Ask any tech issue, big or small</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <ChatIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  <Typography variant="h6">2. Chat or Call</Typography>
                  <Typography variant="body2">Reach out to Neighbor via chat or phone</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <PhoneIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  <Typography variant="h6">3. Get Clear Guidance</Typography>
                  <Typography variant="body2">Receive step-by-step instructions to solve your issue and get back to your day!</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;