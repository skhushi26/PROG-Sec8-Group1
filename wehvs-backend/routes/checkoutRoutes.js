const express = require("express");

const checkoutController = require("../controllers/checkoutController");

const { cancelSubscriptionSchema } = require("../payloads/subscriptionValidation");

const router = express.Router();

router.post('/create-checkout-session', checkoutController.createCheckoutSession);
router.get('/session-status', checkoutController.sessionStatus);
router.post('/cancel-subscription', cancelSubscriptionSchema, checkoutController.cancelSubscription);

module.exports = router;
