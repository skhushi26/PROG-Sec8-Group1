const Credentials = require("../models/Credentials");
const stripe = require('stripe')('sk_test_51OCrEYIlWqny1x6yMdyFLomdRWFFUlnM8kJ3ez2uaYNUVKItu0euwyIf0fKAwZzj7oYhZNmSCepz56220Fzo1iDb00j7XS2TxP');


exports.createCheckoutSession = async (req, res) => {
  const { userId, userEmail } = req.body;
  if (userId != null) {
    const successUrl = `http://localhost:3000/success-payment?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `http://localhost:3000/user/apply-certificate`;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'hosted',
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1ODKyPIlWqny1x6yirKvo0QQ',
          quantity: 1,
        },
      ],
      mode: 'payment',
      client_reference_id: userId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ['card'],
      metadata: {
        paymentTrackingId: userId, 
        billing_email: userEmail
      },
    });

    res.send({ sessionId: session.id });
  }
};


exports.sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
    userId: session.client_reference_id, 
    paymentTrackingId: session.id
  });
};

exports.cancelSubscription = async (req, res) => {
  const { paymentTrackingId } = req.body;

  try {
    // const subscription = await stripe.subscriptions.retrieve({
    //   ID: paymentTrackingId, // Use the customer ID associated with the subscription
    // });

    // // Cancel the subscription
    // await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: true });
    const subscriptions = await stripe.subscriptions.list({
      limit: 3,
    });

    const subscription = await stripe.subscriptions.update(
      { paymentTrackingId },
      {
        cancel_at_period_end: true,
      }
    );

    res.status(200).json({ message: 'Subscription canceled successfully.' });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'Unable to cancel subscription.' });
  }
};