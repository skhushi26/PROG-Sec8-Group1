const express = require("express");

const userController = require("../controllers/userController");
const {
  userRegistrationSchema,
  userProfileUpdateSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../payloads/userValidation");

const fileUploadHandler = require("../utils/fileUploadHandler");
const router = express.Router();

const upload = fileUploadHandler("uploads");

router.post(
  "/register",
  upload.single("profilePhoto"),
  userRegistrationSchema,
  userController.registerUser
);
router.get("/getById/:id", userController.getUserById);

router.put(
  "/update/:id",
  upload.single("profilePhoto"),
  userProfileUpdateSchema,
  userController.updateUser
);

router.post("/forgot-password", forgotPasswordSchema, userController.forgotPassword);

module.exports = router;
