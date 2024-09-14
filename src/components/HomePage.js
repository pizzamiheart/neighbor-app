import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, 
  Grid, Card, CardContent, CardActions 
} from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Neighbor AI
          </Typography>
          <Button color="inherit" component={Link} to="/message">Chat</Button>
          <Button color="inherit" component={Link} to="/call">Call</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to Neighbor AI
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Your personal tech assistant, always ready to help!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Chat with Neighbor
                </Typography>
                <Typography variant="body2">
                  Get instant tech support through our chat interface.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/message">Start Chat</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Call Neighbor
                </Typography>
                <Typography variant="body2">
                  Speak directly with our AI for more complex issues.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to="/call">Start Call</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;