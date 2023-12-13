const Credentials = require("../models/Credentials");
const stripe = require('stripe')('sk_test_51OCrEYIlWqny1x6yMdyFLomdRWFFUlnM8kJ3ez2uaYNUVKItu0euwyIf0fKAwZzj7oYhZNmSCepz56220Fzo1iDb00j7XS2TxP');
const mongoose = require("mongoose");

exports.createCheckoutSession = async (req, res) => {
  const { userId, userEmail } = req.body;
  if (userId != null) {
    const successUrl = `https://wehvs-frontend.onrender.com/success-payment?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `https://wehvs-frontend.onrender.com/user/apply-certificate`;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'hosted',
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1OKvqCIlWqny1x6yVTpizmwE',
          quantity: 1,
        },
      ],
      mode: 'subscription',
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
    // paymentTrackingId: session.id
    paymentTrackingId: session.subscription
  });
};

// exports.cancelSubscription = async (req, res) => {
//   const { paymentTrackingId } = req.body;

//   try {
//      const subscriptions = await stripe.subscriptions.list({
//       limit: 3,
//     });

//     const subscription = await stripe.subscriptions.update(
//       paymentTrackingId,
//       {
//         cancel_at_period_end: true,
//       }
//     );

//     res.status(200).json({ message: 'Subscription cancelled successfully!' });
//   } catch (error) {
//     console.error('Error canceling subscription:', error);
//     res.status(500).json({ error: 'Unable to cancel subscription.' });
//   }
// };

exports.cancelSubscription = async (req, res) => {
  const { paymentTrackingId, userId } = req.body;

  try {
    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(paymentTrackingId);


    const invoices = await stripe.invoices.list({
      subscription: subscription.id,
    });

    let paymentIntentId;
    for (const invoice of invoices.data) {
      if (invoice && invoice.payment_intent) {
        paymentIntentId = invoice.payment_intent;
        console.log('Payment Intent ID:', paymentIntentId);
        // Now you can use paymentIntentId for further processing
      } else {
        console.log('No payment intent associated with this invoice.');
      }
    }
    // Check if the latest invoice has a payment_intent
    if (paymentIntentId) {
      // Refund the payment_intent
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
      });

      console.log('Refund:', refund);

      // Cancel the subscription
      await stripe.subscriptions.update(paymentTrackingId, {
        cancel_at_period_end: true,
      });

      // Update IsPaymentDone value in Credentials table
      const userIdObjectId = new mongoose.Types.ObjectId(userId);

      // Use findOne to get a single document
      const existingCredentials = await Credentials.findOne({ userId: userId });

      // Check if a document was found
      if (existingCredentials) {
        existingCredentials.isPaymentDone = false;
        existingCredentials.paymentTrackingId = null;

        // Use save method to update the document
        await existingCredentials.save();
      }
      
        res.status(200).json({ message: 'Subscription cancelled successfully!' });
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      res.status(500).json({ error: 'Unable to cancel subscription.' });
    }
  };