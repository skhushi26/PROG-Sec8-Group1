const express = require("express");
const userRequestController = require("../controllers/userRequestController");
const { UserRequestApproveDenySchema } = require("../payloads/userRequestValidation");

const router = express.Router();

router.put("/approve/:id", userRequestController.ApproveRequest);
router.put("/deny/:id", UserRequestApproveDenySchema, userRequestController.DenyRequest);

module.exports = router;
