const express = require("express");

const employerController = require("../controllers/employerController");
const { employerUpdateSchema } = require("../payloads/employerValidation");
const router = express.Router();


router.put("/updateEmployer/:id", employerUpdateSchema, employerController.updateEmployer);

module.exports = router;
