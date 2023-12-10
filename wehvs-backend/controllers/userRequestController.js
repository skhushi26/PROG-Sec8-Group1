const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserRequest = require("../models/UserRequest");
const Employer = require("../models/Employer");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");
const PDFDocument = require("pdfkit");

exports.UserRequestList = async (req, res) => {
  try {
    const userRequests = await UserRequest.find().populate("userId", "firstName lastName");
    const userRequestsData = userRequests.map((request) => ({
      ...request.toObject(),
      userFullName: request.userId ? (request.userId.firstName + " " + request.userId.lastName) : "",
    }));
    responseBuilder(res, null, userRequestsData, "User Requests retrieved successfully", 200);
  } catch (error) {
    console.log("error: ", error);
    responseBuilder(res, error, null, "Something went wrong while fetching user requests", 500);
  }
};

exports.UserVerificationRequest = async (req, res) => {
  try {
    const { userId, companyName, startDate, endDate, jobTitle, comment } = req.body;

    const existingRequests = await UserRequest.find({ userId: userId });
    const existingRequestsCount = existingRequests.length;

    if (existingRequestsCount >= 2) {
      responseBuilder(
        res,
        null,
        null,
        "You have reached the maximum number of requests. Upgrade your membership to unlock more access!",
        400
      );
    } else {
      const existingEmployer = await Employer.findOne({ companyName });
      if (!existingEmployer) {
        responseBuilder(res, null, null, "Employer is not found in our system!", 400);
      } else {
        const employerId = existingEmployer._id;
        // const employerId = "654559f1ef131caf95f404a5"; // This id will come from frontend.
        const employerCredentialsData = await Credentials.findOne({ userId: employerId });

        // Check if a record exists in the userRequest table with the same conditions
        const existingUserRequest = await UserRequest.findOne({
          employerId,
          startDate,
          endDate,
          jobTitle,
          requestStatus: "Pending",
        });

        if (!existingUserRequest) {
          // Retrieve user ID and role from localStorage
          const userData = await User.findById(userId);
          const userRequestData = await UserRequest.create({
            userId,
            employerId,
            startDate,
            endDate,
            jobTitle,
            comment,
            requestDate: new Date(),
          });

          let newHtml = "";
          fs.readFile(
            "views/user-verification-request-email.html",
            { encoding: "utf-8" },
            (err, html) => {
              if (err) {
                console.log("err in sending mail", err);
              } else {
                let token = jwt.sign({ email: employerCredentialsData.email }, "wehvssecretkey", {
                  expiresIn: 600,
                });
                let name = userData.firstName + " " + userData.lastName;
                newHtml = html.replace("{{{name}}}", name);
                sendMailHandler(
                  "wehvs2023@gmail.com",
                  employerCredentialsData.email,
                  "Verification Request",
                  newHtml
                );
              }
            }
          );

          responseBuilder(
            res,
            null,
            userRequestData,
            "Your request has been received successfully! You will receive an email notification once the process is complete.",
            200
          );
        } else {
          responseBuilder(
            res,
            null,
            null,
            "You currently have an active request, please wait for the ongoing request to be completed before proceeding!",
            400
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
    responseBuilder(res, error, null, "Something went wrong in registering employer!", 500);
  }
};

exports.ApproveRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    console.log("req.body: ", req.body);
    const id = req.params.id;
    const isRequestExists = await UserRequest.findById({ _id: id });
    const profileDetails = await Credentials.findOne({ userId: isRequestExists.userId });
    if (!isRequestExists) {
      responseBuilder(res, null, null, "Request not found!", 400);
    } else {
      if (isRequestExists.requestStatus == "Approved") {
        responseBuilder(res, null, null, "This request has already been approved", 400);
      } else {
        const updateValues = { requestStatus: "Approved" };

        if (comment !== undefined && comment !== null) {
          updateValues.comment = comment;
        }
        await UserRequest.findByIdAndUpdate({ _id: id }, { $set: updateValues });

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

        responseBuilder(res, null, null, "Your request has been approved by the employer.", 200);
      }
    }
  } catch (error) {
    console.log("error", error);
    responseBuilder(res, error, null, "Something went wrong in approving request", 500);
  }
};

exports.DenyRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    console.log("comment", comment);
    const id = req.params.id;
    const isRequestExists = await UserRequest.findById({ _id: id });
    const profileDetails = await Credentials.findOne({ userId: isRequestExists.userId });
    if (!isRequestExists) {
      responseBuilder(res, null, null, "Request not found!", 400);
    } else {
      if (isRequestExists.requestStatus == "Deny") {
        responseBuilder(res, null, null, "This request has already been denied", 400);
      } else {
        const updateValues = { requestStatus: "Deny" };
        if (comment !== undefined && comment !== null) {
          updateValues.comment = comment;
        }
        await UserRequest.findByIdAndUpdate({ _id: id }, { $set: updateValues });

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

        responseBuilder(res, null, null, "Your request has been denied by the employer.", 200);
        // Email will be sent to that particular user
      }
    }
  } catch (error) {
    responseBuilder(res, error, null, "Something went wrong in denying request", 500);
  }
};

function generateCertificate(userData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      // Register custom fonts if needed
      // For example, loading fonts from file
      // doc.font('path/to/your/font.ttf');

      // Set font size, color, and text for the certificate
      doc.fontSize(32).fillColor("#5469d4").text("CERTIFICATE", { align: "center" });
      doc.moveDown().fontSize(24).text("WORLD EMPLOYMENT VERIFICATION", { align: "center" });

      doc.moveDown(2).fontSize(18).text("This Certificate is Presented To:", { align: "center" });
      doc
        .moveDown()
        .fontSize(28)
        .font("Times-Italic")
        .text(userData.firstName + " " + userData.lastName, { align: "center" });

      doc
        .moveDown(2)
        .fontSize(18)
        .text(
          `This is to certify that her employment at XYZ, Turkey, during her tenure from 2012 to 2016 is valid.`,
          { align: "center" }
        );

      doc.moveDown(2).fontSize(18).fillColor("#fb246a").text("MATT ZHANG", { align: "center" });
      doc.moveDown().fontSize(18).fillColor("#5469d4").text("TITLE", { align: "center" });
      doc.moveDown().fontSize(18).fillColor("#fb246a").text("NEIL TRAN", { align: "center" });
      doc.moveDown().fontSize(18).fillColor("#5469d4").text("TITLE", { align: "center" });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers).toString("base64");
        resolve(pdfData);
      });

      doc.end();
    } catch (error) {
      console.error("Error generating certificate:", error);
      reject("Failed to generate the certificate");
    }
  });
}

// Assuming '/generateCertificate' is your endpoint to trigger certificate generation
exports.generateCertificate = async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = "657281ee453b6086a02bf072";

    // Fetch user data based on the userId
    const userData = await User.findById(userId);

    const pdfData = await generateCertificate(userData);

    // Set the response content type to application/pdf
    res.contentType("application/pdf");

    // Send the PDF data as the response
    res.send(Buffer.from(pdfData, "base64"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate the certificate" });
  }
};
