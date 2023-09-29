const express = require("express");

const userController = require("../controllers/userController");
const employerController = require("../controllers/employerController");
const { userRegistrationSchema, loginSchema } = require("../payloads/userValidation");
const { EmployerSchema } = require("../models/Employers.js");
const router = express.Router();

router.post("/register", userRegistrationSchema, userController.registerUser);

router.get("/verify/:token", userController.getVerifiedUser);

router.post("/login", loginSchema, userController.login);

router.post("/updateEmployer/:id", EmployerSchema, employerController.updateEmployer);

module.exports = router;
