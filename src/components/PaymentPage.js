import React from 'react';
import { Box, Typography } from '@mui/material';
import { auth } from '../firebase';

function PaymentPage() {
  const user = auth.currentUser;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Upgrade Your Account</Typography>
      <Typography variant="body1" paragraph>
        Get unlimited access to Neighbor AI.
      </Typography>
      <stripe-buy-button
        buy-button-id="buy_btn_1O6NtyKXo7Je3eN0hjILiP98"
        publishable-key="pk_live_51OfEXpKXo7Je3eN0g0LwoGXB78Z2HU5uetwUkqn7wvziB92yl0mL7g5r6JAf7HgWLQ1DC0gne4T1sm0FJCVQ5WYM00ra6HYJhb"
        customer-email={user.email}
      >
      </stripe-buy-button>
    </Box>
  );
}

export default PaymentPage;