const express = require("express");

const userController = require("../controllers/userController");
const {
  userRegistrationSchema,
  loginSchema,
  userProfileUpdateSchema,
} = require("../payloads/userValidation");
const fileUploadHandler = require("../utils/fileUploadHandler");
const router = express.Router();

const upload = fileUploadHandler("uploads");

router.post("/register", userRegistrationSchema, userController.registerUser);

router.get("/verify/:token", userController.getVerifiedUser);

router.post("/login", loginSchema, userController.login);

router.put(
  "/update/:id",
  upload.single("profilePhoto"),
  userProfileUpdateSchema,
  userController.updateUser
);

module.exports = router;
