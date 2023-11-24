const express = require("express");

const jobPostController = require("../controllers/jobPostController");
const authorize = require("../utils/authentication");
const { jobPostSchema } = require("../payloads/jobPostValidation");

const router = express.Router();

router.post("/add", jobPostSchema, jobPostController.addJobPost);
router.get("/find/:id", jobPostController.findJobById);
router.put("/update/:id", jobPostSchema, jobPostController.updateJobPost);
router.get("/experience-level", jobPostController.getAllExperienceLevels);
router.get("/job-types", jobPostController.getAllJobTypes);
router.get("/get-all-for-user", authorize("User"), jobPostController.getAllJobListUser);
router.get("/get-all-for-employer", authorize("Employer"), jobPostController.getAllJobListEmployer);

module.exports = router;
