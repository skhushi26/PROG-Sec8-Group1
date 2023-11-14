const express = require("express");

const employerController = require("../controllers/employerController");
const {
  employerRegistrationSchema,
  employerUpdateSchema,
  employerLoginSchema,
} = require("../payloads/employerValidation");
const router = express.Router();

// router.get("/employer/:id", employerController.getEmployer);
router.post("/register", employerRegistrationSchema, employerController.registerEmployer);
router.get("/getById/:id", employerController.getEmployerById);
// router.get("/verify/:token", employerController.getVerifiedEmployer);
router.put("/updateEmployer/:id", employerUpdateSchema, employerController.updateEmployer);
// router.post("/login", employerLoginSchema, employerController.login);

module.exports = router;
