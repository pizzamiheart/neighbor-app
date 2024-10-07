const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updatePaymentStatus, getUserIdFromEmail } = require('../../src/utils/userUtils');

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    
    // Get the customer email from the session
    const customerEmail = session.customer_details.email;
    
    // Get the user ID from the email
    const userId = await getUserIdFromEmail(customerEmail);
    
    if (userId) {
      // Update the user's payment status in your database
      await updatePaymentStatus(userId, true);
    }
  }

  return { statusCode: 200 };
};