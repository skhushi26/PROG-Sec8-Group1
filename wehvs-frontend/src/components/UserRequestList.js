import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { Button } from "react-bootstrap";

const UserRequestList = () => {
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
          <tr>
            <td>Eda Ekeyilmaz</td>
            <td>Sr. Software Engineer</td>
            <td>{moment("2020-12-03").format("LL")}</td>
            <td>{moment("2022-11-03").format("LL")}</td>
            <td>{moment("2023-09-22").format("LL")}</td>
            <td>Pending</td>
            <td></td>
            <td>
              <Button variant="success">Approve</Button>
              <Button variant="danger" className="mt-2">
                Deny
              </Button>
            </td>
          </tr>
          <tr>
            <td>Khushali Shah</td>
            <td>Jr. MERN Stack Engineer</td>
            <td>{moment("2020-12-03").format("LL")}</td>
            <td>{moment("2022-11-03").format("LL")}</td>
            <td>{moment("2023-09-22").format("LL")}</td>
            <td>Pending</td>
            <td></td>
            <td>
              <Button variant="success">Approve</Button>
              <Button variant="danger" className="mt-2">
                Deny
              </Button>
            </td>
          </tr>
          <tr>
            <td>Namitha Chevari</td>
            <td>Sr. Application Engineer</td>
            <td>{moment("2020-12-03").format("LL")}</td>
            <td>{moment("2022-11-03").format("LL")}</td>
            <td>{moment("2023-09-22").format("LL")}</td>
            <td>Pending</td>
            <td></td>
            <td>
              <Button variant="success">Approve</Button>
              <Button variant="danger" className="mt-2">
                Deny
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserRequestList;
