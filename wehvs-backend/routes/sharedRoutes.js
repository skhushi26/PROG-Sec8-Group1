const express = require("express");

const sharedController = require("../controllers/sharedController");
const { loginSchema, paymentStatusSchema } = require("../payloads/sharedValidation");

const router = express.Router();

router.post("/login", loginSchema, sharedController.login);

router.get("/verify/:token", sharedController.getVerified);

router.post("/update-payment-status", paymentStatusSchema , sharedController.updatePaymentStatus);

module.exports = router;
