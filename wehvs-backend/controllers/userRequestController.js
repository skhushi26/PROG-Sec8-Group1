const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserRequest = require("../models/UserRequest");
const Employer = require("../models/Employer");
const User = require("../models/User");
const Credential = require("../models/Credentials");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");

exports.UserRequestList = async (req, res) => {
  try {
    const userRequests = await UserRequest.find().populate("userId", "firstName lastName");

    const userRequestsData = userRequests.map((request) => ({
      ...request.toObject(),
      userFullName: request.userId.firstName + " " + request.userId.lastName,
    }));

    res.send(responseBuilder(null, userRequestsData, "User Requests retrieved successfully", 200));
  } catch (error) {
    res.send(
      responseBuilder(error, null, "Something went wrong while fetching user requests", 500)
    );
  }
};

exports.UserVerificationRequest = async (req, res) => {
  try {
    const {
      companyName,
      startDate,
      endDate,
      jobTitle,
      comment
    } = req.body;

    const employerData = await Employer.findOne({ companyName });
    // const employerId = employerData._id;
    const employerId = "654559f1ef131caf95f404a5"; // This id will come from frontend.
    const employerCredentialsData = await Credential.findOne({ userId: employerId });


      // Check if a record exists in the userRequest table with the same conditions
      const existingUserRequest = await UserRequest.findOne({
        employerId,
        startDate,
        endDate,
        jobTitle,
        requestStatus: "Pending" 
      });

      if (!existingUserRequest) {

        const userId= "65455aa6957fa8009dc75eb1";
        const userData = await User.findById(userId);
        const userRequestData = await UserRequest.create({
          userId, // It should come from session
          employerId,
          startDate,
          endDate,
          jobTitle,
          comment,
          requestDate: new Date()
        });

      let newHtml = "";
      fs.readFile("views/user-verification-request-email.html", { encoding: "utf-8" }, (err, html) => {
        if (err) {
          console.log("err in sending mail", err);
        } else {
          let token = jwt.sign({ email: employerCredentialsData.email }, "wehvssecretkey", { expiresIn: 600 });
          let name= userData.firstName + " " + userData.lastName;
          newHtml = html.replace(
            "{{{name}}}",
            name
          );
          sendMailHandler("wehvs2023@gmail.com", employerCredentialsData.email, "Verification Request", newHtml);
        }
      });

      res.send(
        responseBuilder(
          null,
          userRequestData,
          "Employer registered successfully! Email has been sent to your registered email id for verification.",
          200
        )
      );
    } else {
      res.send(
        responseBuilder(
          null,
          null,
          "You currently have an active request, please wait for the ongoing request to be completed before proceeding!",
          400
        )
      );
    }
  } catch (error) {
    console.log(error);
    res.send(responseBuilder(error, null, "Something went wrong in registering employer!", 500));
  }
};

exports.ApproveRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    const id = req.params.id;
    const isRequestExists = await UserRequest.findById({ _id: id });
    const profileDetails = await Credentials.findOne({ userId: isRequestExists.userId });
    if (!isRequestExists) {
      res.send(responseBuilder(null, null, "Request not found!", 400));
    } else {
      if (isRequestExists.requestStatus == "Approved") {
        res.send(responseBuilder(null, null, "This request has already been approved", 400));
      } else {
        await UserRequest.findByIdAndUpdate(
          { _id: id },
          { $set: { requestStatus: "Approved", comment } }
        );

        let newHtml = "";
        fs.readFile("views/certificate-approve-email.html", { encoding: "utf-8" }, (err, html) => {
          if (err) {
            console.log("err in sending mail", err);
          } else {
            newHtml = html.replace("{{{comment}}}", comment);
            console.log("newHtml", newHtml);
            sendMailHandler(
              "wehvs2023@gmail.com",
              profileDetails?.email,
              "Certificate Request Approval",
              newHtml
            );
            // res.send(newHtml);
          }
        });

        res.send(
          responseBuilder(null, null, "Your request has been approved by the employer.", 200)
        );
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in approving request", 500));
  }
};

exports.DenyRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    const id = req.params.id;
    const isRequestExists = await UserRequest.findById({ _id: id });
    const profileDetails = await Credentials.findOne({ userId: isRequestExists.userId });
    if (!isRequestExists) {
      res.send(responseBuilder(null, null, "Request not found!", 400));
    } else {
      if (isRequestExists.requestStatus == "Deny") {
        res.send(responseBuilder(null, null, "This request has already been denied", 400));
      } else {
        await UserRequest.findByIdAndUpdate(
          { _id: id },
          { $set: { requestStatus: "Deny", comment } }
        );

        let newHtml = "";
        fs.readFile("views/certificate-deny-email.html", { encoding: "utf-8" }, (err, html) => {
          if (err) {
            console.log("err in sending mail", err);
          } else {
            newHtml = html.replace("{{{comment}}}", comment);
            console.log("newHtml", newHtml);
            sendMailHandler(
              "wehvs2023@gmail.com",
              profileDetails.email,
              "Certificate Request Approval",
              newHtml
            );
            // res.send(newHtml);
          }
        });

        res.send(responseBuilder(null, null, "Your request has been denied by the employer.", 200));
        // Email will be sent to that particular user
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in denying request", 500));
  }
};
