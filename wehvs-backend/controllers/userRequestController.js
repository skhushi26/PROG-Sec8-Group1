const jwt = require("jsonwebtoken");
const fs = require("fs");
const UserRequest = require("../models/UserRequest");
const Employer = require("../models/Employer");
const User = require("../models/User");
const Credentials = require("../models/Credentials");
const responseBuilder = require("../utils/response");
const sendMailHandler = require("../utils/sendMailHandler");
const PDFDocument = require("pdfkit");
const moment = require("moment");

exports.UserRequestList = async (req, res) => {
  try {
    const userRequests = await UserRequest.find().populate("userId", "firstName lastName");
    const userRequestsData = userRequests.map((request) => ({
      ...request.toObject(),
      userFullName: request.userId ? request.userId.firstName + " " + request.userId.lastName : "",
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

    const userCredentialsData = await Credentials.findOne({ userId: userId });
    const existingRequests = await UserRequest.find({ userId: userId });
    const existingRequestsCount = existingRequests.length;
    if (!(userCredentialsData.isPaymentDone) && existingRequestsCount >= 2) {
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
    responseBuilder(res, error, null, "Something went wrong!", 500);
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
            newHtml = html.replace("{{{comment}}}", comment).replace("{{userRequestId}}", id);
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
      if (isRequestExists.requestStatus == "Denied") {
        responseBuilder(res, null, null, "This request has already been denied", 400);
      } else {
        const updateValues = { requestStatus: "Denied" };
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

// function generateCertificate(userData, employerData, userRequestDetails) {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: "A4", margin: 50 });

//       // Load your logo - Replace 'path/to/your/logo.png' with the actual path to your logo file
//       const logo = fs.readFileSync("./images/wehvs-logo-1.jpeg"); // Replace this line

//       // Logo on the top left corner
//       doc.image(logo, 50, 50, { width: 100 });

//       // Set font size, color, and text for the certificate
//       doc.fontSize(32).fillColor("black").text("CERTIFICATE", { align: "center" });
//       doc.moveDown().fontSize(24).text("WORLD EMPLOYMENT VERIFICATION", { align: "center" });

//       doc.moveDown(2).fontSize(18).text("This Certificate is Presented To:", { align: "center" });
//       doc
//         .moveDown()
//         .fontSize(28)
//         .font("Times-Italic")
//         .text(userData.firstName + " " + userData.lastName, { align: "center" });

//       doc
//         .moveDown(2)
//         .fontSize(18)
//         .text(
//           `This is to certify that his/her employment at ${employerData.companyName
//           }, during his/her tenure from ${moment(userRequestDetails.startDate).format(
//             "L"
//           )} to ${moment(userRequestDetails.endDate).format("L")} is valid.`,
//           { align: "center" }
//         );

//       // Endorsement signatures

//       doc.moveDown(2).text("Wehvs Team", {
//         align: "left",
//       });

//       doc.moveDown(0.3).lineWidth(1).moveTo(50, doc.y).lineTo(150, doc.y).stroke();

//       const buffers = [];
//       doc.on("data", buffers.push.bind(buffers));
//       doc.on("end", () => {
//         const pdfData = Buffer.concat(buffers).toString("base64");
//         resolve(pdfData);
//       });

//       doc.end();
//     } catch (error) {
//       console.error("Error generating certificate:", error);
//       reject("Failed to generate the certificate");
//     }
//   });
// }

function generateCertificate(userData, employerData, userRequestDetails) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      // doc.font("Times-Roman");

      // Load your logo - Replace 'path/to/your/logo.png' with the actual path to your logo file
      const logo = fs.readFileSync("./images/wehvs-logo-1.jpeg"); // Replace this line
      const esignature = fs.readFileSync("./images/example_signature.png"); // Replace this line

      // Logo on the top left corner with date on the right side
      doc.image(logo, 60, 50, { width: 150 });
      doc.moveDown(2).fontSize(12).fillColor("black").moveTo(10, doc.x).text(moment().format("L"), { align: "right" });

      // Add margin after logo
      doc.moveDown(1).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

      // Certificate heading
      doc.moveDown(2).fontSize(20).font('Times-Bold').fillColor("#3f62b3").text("WORLD EMPLOYMENT VERIFICATION REPORT", { align: "center", bold: true });

      doc.fillColor("black");

      // Add margin after the row
      doc.moveDown(1).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      doc
        .moveDown(2).fontSize(16).font("Times-Italic")
        .text(
          `This is to certify that ${userData.firstName} ${userData.lastName}'s employment at ${employerData.companyName}, during his/her tenure.`,
          { align: "left" }
        );
      doc.moveDown(3);

      // Employment Summary
      doc.fontSize(18).font("Times-Bold").text("Employment Summary", { align: "left", bold: true });
      doc.moveDown(1);



      // Details in 6 rows
      const details = [
        { label: "Name", value: `${userData.firstName} ${userData.lastName}` },
        { label: "Company", value: employerData.companyName },
        { label: "Title", value: userRequestDetails.jobTitle },
        { label: "Start Date", value: moment(userRequestDetails.startDate).format("L") },
        { label: "End Date", value: moment(userRequestDetails.endDate).format("L") },
        { label: "Country", value: userData.addressId.country },
      ];

      doc.x += 20;
      details.forEach((detail) => {
        doc.fontSize(16).font("Times-Roman").text(`${detail.label}: ${detail.value}`, { align: "left", bold: true });
        // doc.x += 20;
        doc.moveDown(0.3);
      });

      doc.x += 0;
      doc.font("Times-Roman");
      doc.moveDown(5);

      doc.fontSize(16).font("Times-Roman").text("Signature", { align: "right", bold: true });
      doc.moveDown(0.5);
      
      // Get the current position before adding the image
      const beforeImagePosition = doc.y;

      // Add the image, aligning it to the right
      doc.image(esignature, doc.page.width - 160, beforeImagePosition, { width: 120 });
      // doc.fontSize(16).font("Times-Roman").text(`${employerData.companyName}`, { align: "right", bold: true });

      // Add margin after details
      doc.moveDown(1).lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(1);

      // Created by text in the center
      doc.fontSize(14).text("Created By WEHVS © 2023", { align: "center" });

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
    const userRequestId = req.params.id;
    const userRequestDetails = await UserRequest.findById({ _id: userRequestId });

    const employerData = await Employer.findById({ _id: userRequestDetails.employerId });

    // Fetch user data based on the userId
    const userData = await User.findById({ _id: userRequestDetails.userId }).populate("addressId");
    const pdfData = await generateCertificate(userData, employerData, userRequestDetails);

    // Set the response content type to application/pdf
    res.contentType("application/pdf");

    // Send the PDF data as the response
    res.send(Buffer.from(pdfData, "base64"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate the certificate" });
  }
};
