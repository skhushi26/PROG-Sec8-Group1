const express = require("express");

const employerController = require("../controllers/employerController");
const { employerRegistrationSchema,employerUpdateSchema } = require("../payloads/employerValidation");
const router = express.Router();

// router.get("/employer/:id", employerController.getEmployer);
router.post("/register", employerRegistrationSchema, employerController.registerEmployer);
router.put("/updateEmployer/:id", employerUpdateSchema, employerController.updateEmployer);

module.exports = router;