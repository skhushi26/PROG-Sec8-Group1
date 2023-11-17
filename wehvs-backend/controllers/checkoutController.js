const stripe = require('stripe')('sk_test_51OCrEYIlWqny1x6yMdyFLomdRWFFUlnM8kJ3ez2uaYNUVKItu0euwyIf0fKAwZzj7oYhZNmSCepz56220Fzo1iDb00j7XS2TxP');

const YOUR_DOMAIN = 'http://localhost:3000';


exports.createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1ODKyPIlWqny1x6yirKvo0QQ',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/membership`,
  });

  res.send({clientSecret: session.client_secret});
};


exports.sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
};
