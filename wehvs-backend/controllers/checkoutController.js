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
