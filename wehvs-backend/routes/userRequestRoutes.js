const express = require("express");
const userRequestController = require("../controllers/userRequestController");
const {
  UserRequestApproveDenySchema,
  userRequestValidationSchema,
} = require("../payloads/userRequestValidation");
const authorize = require("../utils/authentication");

const router = express.Router();

// router.get("/", authorize("Employer"), userRequestController.UserRequestList);
router.get("/", userRequestController.UserRequestList);

router.post(
  "/send",
  // authorize("User"),
  userRequestValidationSchema,
  userRequestController.UserVerificationRequest
);

router.put(
  "/approve/:id",
  // authorize("Employer"),
  UserRequestApproveDenySchema,
  userRequestController.ApproveRequest
);
router.put(
  "/deny/:id",
  // authorize("Employer"),
  UserRequestApproveDenySchema,
  userRequestController.DenyRequest
);

router.get("/generate-certificate/:id", userRequestController.generateCertificate);

module.exports = router;
