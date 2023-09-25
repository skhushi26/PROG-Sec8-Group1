const express = require("express");

const userController = require("../controllers/userController");
const { userRegistrationSchema, loginSchema } = require("../payloads/userValidation");
const router = express.Router();

router.post("/register", userRegistrationSchema, userController.registerUser);

router.get("/verify/:token", userController.getVerifiedUser);

router.post("/login", loginSchema, userController.login);

module.exports = router;
