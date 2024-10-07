import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Tab, Tabs, Card, CardContent } from '@mui/material';
import { signUp, login } from '../auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (tabValue === 0) {
        await login(email, password);
      } else {
        await signUp(email, password);
      }
      // Redirect to home page after successful sign in or sign up
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent. Check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {tabValue === 0 ? 'Sign In' : 'Create an Account'}
          </Typography>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered sx={{ mb: 2 }}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {tabValue === 0 ? 'Sign In' : 'Sign Up'}
            </Button>
            <Button onClick={handleResetPassword}>Forgot Password?</Button>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthPage;