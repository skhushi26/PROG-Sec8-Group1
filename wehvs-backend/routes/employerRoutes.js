const express = require("express");

const employerController = require("../controllers/employerController");
const {
  employerRegistrationSchema,
  employerUpdateSchema,
  employerLoginSchema,
} = require("../payloads/employerValidation");

const fileUploadHandler = require("../utils/fileUploadHandler");
const router = express.Router();

const upload = fileUploadHandler("uploads");

router.post(
  "/register", 
  upload.single("profilePhoto"),
  employerRegistrationSchema, 
  employerController.registerEmployer);

router.get("/getById/:id", employerController.getEmployerById);

router.put(
  "/updateEmployer/:id", 
  upload.single("profilePhoto"),
  employerUpdateSchema, 
  employerController.updateEmployer);

module.exports = router;
