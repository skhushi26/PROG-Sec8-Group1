const express = require("express");

const jobPostController = require("../controllers/jobPostController");
const authorize = require("../utils/authentication");

const router = express.Router();

router.post("/add", authorize("Employer"), jobPostController.addJobPost);
router.get("/find/:id", authorize("Employer"), jobPostController.findJobById);

module.exports = router;
