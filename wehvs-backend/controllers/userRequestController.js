const responseBuilder = require("../utils/response");
const UserRequest = require("../models/UserRequest");

exports.ApproveRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    const id = req.params.id;
    const isRequestExists = await UserRequest.findById({ _id: id });
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
        res.send(responseBuilder(null, null, "Your request has been denied by the employer.", 200));
      }
    }
  } catch (error) {
    res.send(responseBuilder(error, null, "Something went wrong in denying request", 500));
  }
};
