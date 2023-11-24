import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UserRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3333/user-request")
      .then((response) => response.json())
      .then((data) => {
        console.log("data.data", data.data);
        setRequests(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [requests]);

  const openApproveModal = (requestId) => {
    setSelectedRequestId(requestId);
    setShowApproveModal(true);
  };

  const handleCloseApproveModal = () => {
    setShowApproveModal(false);
    setComment("");
    setSelectedRequestId(null);
  };

  const openDenyModal = (requestId) => {
    setSelectedRequestId(requestId);
    setShowDenyModal(true);
  };

  const handleCloseDenyModal = () => {
    setShowDenyModal(false);
    setComment("");
    setSelectedRequestId(null);
  };

  const handleApprove = async () => {
    if (!selectedRequestId) {
      toast.info("Request not found!");
      return;
    }

    const requestBody = {
      comment: comment || "",
    };

    console.log("requestBody", requestBody);

    try {
      const response = await fetch(
        `http://localhost:3333/user-request/approve/${selectedRequestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Request approved successfully");
        toast.success("Request approved successfully");
      } else {
        if (responseData && responseData.message) {
          if (response.status === 400) {
            console.error(responseData.message);
            toast.warn(responseData.message);
          } else if (response.status === 500) {
            // Server error
            console.error(responseData.message);
            toast.error(responseData.message);
          } else {
            console.error("Other error:", responseData.message);
            toast.error(responseData.message);
          }
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
      handleCloseApproveModal();
    } catch (err) {
      console.error("Error approving request:", err);
      toast.error("Something went wrong in approving request");
      handleCloseApproveModal();
    }
  };

  const handleDeny = async () => {
    if (!selectedRequestId) {
      toast.info("Request not found!");
      return;
    }

    const requestBody = {
      comment: comment,
    };

    try {
      const response = await fetch(`http://localhost:3333/user-request/deny/${selectedRequestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Request denied successfully");
        toast.success("Request denied successfully");
      } else {
        if (responseData && responseData.message) {
          if (response.status === 400) {
            console.error(responseData.message);
            toast.warn(responseData.message);
          } else if (response.status === 500) {
            // Server error
            console.error(responseData.message);
            toast.error(responseData.message);
          } else {
            console.error("Other error:", responseData.message);
            toast.error(responseData.message);
          }
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
      handleCloseDenyModal();
    } catch (err) {
      console.error("Error approving request:", err);
      toast.error("Something went wrong in denying request");
      handleCloseDenyModal();
    }
  };

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Fullname</th>
            <th>Job Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Request date</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests &&
            requests.map((request, index) => (
              <tr key={index}>
                <td>{request.userFullName}</td>
                <td>{request.jobTitle}</td>
                <td>{moment(request.startDate).format("LL")}</td>
                <td>{moment(request.endDate).format("LL")}</td>
                <td>{moment(request.requestDate).format("LL")}</td>
                <td>{request.requestStatus}</td>
                <td>{request.comment}</td>
                <td>
                  <Button variant="success" onClick={() => openApproveModal(request._id)}>
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => openDenyModal(request._id)}
                    className="mt-2"
                  >
                    Deny
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Modal for Approval */}
      <Modal show={showApproveModal} onHide={handleCloseApproveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="comment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseApproveModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleApprove}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Approval */}
      <Modal show={showDenyModal} onHide={handleCloseDenyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="comment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDenyModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeny}>
            Deny
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserRequestList;
