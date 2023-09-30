const express = require("express");

const userController = require("../controllers/userController");
const employerController = require("../controllers/employerController");
const { userRegistrationSchema, loginSchema } = require("../payloads/userValidation");
const Employer = require("../models/Employers")
const router = express.Router();

router.post("/register", userRegistrationSchema, userController.registerUser);

router.get("/verify/:token", userController.getVerifiedUser);

router.post("/login", loginSchema, userController.login);

module.exports = router;
