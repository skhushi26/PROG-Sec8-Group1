const express = require("express");
const userRequestController = require("../controllers/userRequestController");
const { UserRequestApproveDenySchema } = require("../payloads/userRequestValidation");
const authorize = require("../utils/authentication");

const router = express.Router();

router.put(
  "/approve/:id",
  authorize("Employer"),
  UserRequestApproveDenySchema,
  userRequestController.ApproveRequest
);
router.put(
  "/deny/:id",
  authorize("Employer"),
  UserRequestApproveDenySchema,
  userRequestController.DenyRequest
);

module.exports = router;
