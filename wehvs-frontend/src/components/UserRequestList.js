import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { Button } from "react-bootstrap";

const UserRequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/user-request")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
                  <Button variant="success">Approve</Button>
                  <Button variant="danger" className="mt-2">
                    Deny
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserRequestList;
