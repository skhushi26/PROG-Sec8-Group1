const express = require("express");

const jobPostController = require("../controllers/jobPostController");
const authorize = require("../utils/authentication");
const { jobPostSchema } = require("../payloads/jobPostValidation");

const router = express.Router();

router.post("/add", jobPostSchema, authorize("Employer"), jobPostController.addJobPost);
router.get("/find/:id", authorize("Employer"), jobPostController.findJobById);
router.put("/update/:id", jobPostSchema, authorize("Employer"), jobPostController.updateJobPost);
router.get("/experience-level", authorize("Employer"), jobPostController.getAllExperienceLevels);
router.get("/job-types", authorize("Employer"), jobPostController.getAllJobTypes);

module.exports = router;
