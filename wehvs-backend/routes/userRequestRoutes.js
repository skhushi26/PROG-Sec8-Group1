const express = require("express");
const userRequestController = require("../controllers/userRequestController");

const router = express.Router();

router.put("/approve/:id", userRequestController.ApproveRequest);
router.put("/deny/:id", userRequestController.DenyRequest);

module.exports = router;
