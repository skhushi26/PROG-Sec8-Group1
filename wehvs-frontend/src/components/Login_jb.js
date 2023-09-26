import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
      },
      successMessage: "",
      errorMessage: ""
    };
  }


  render() {
    return (
      <div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 py-4">
            <div className="card">
              <h2 className="text-center mb-4 text-black">Add an employee</h2>
              {successMessage && (
                <div className="alert alert-success" role="alert" bis_skin_checked="1">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                  {errorMessage}
                </div>
              )}
              <Form
                name="employeeAddForm"
                onSubmit={this.handleSubmit}
                className="form-card mb-3">

                {/* FIRST NAME */}
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Group controlId="formFirstName">
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="FirstName"
                    onChange={this.handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                {/* LAST NAME */}
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Group controlId="formLastName">
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="LastName"
                    onChange={this.handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                {/* AGE */}
                <Form.Label htmlFor="age">Age</Form.Label>
                <Form.Group controlId="formAge">
                  <Form.Control
                    type="text"
                    name="age"
                    placeholder="Age"
                    onChange={this.handleChange}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                {/* DATE OF JOINING */}
                <Form.Label htmlFor="dateOfJoining">Date Of Joining</Form.Label>
                <Form.Group controlId="formDateOfJoining">
                  <Form.Control
                    type="date"
                    name="dateOfJoining"
                    onChange={this.handleChange}
                    isInvalid={!!errors.dateOfJoining}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfJoining}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                {/* TITLE */}
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Group controlId="formTitle">
                  <Form.Control
                    as="select"
                    name="title"
                    onChange={this.handleChange}
                    isInvalid={!!errors.title}>
                    <option value="-1">Select Title</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                <Form.Label htmlFor="department">Department</Form.Label>
                <Form.Group controlId="formDepartment">
                  <Form.Control
                    as="select"
                    name="department"
                    onChange={this.handleChange}
                    isInvalid={!!errors.department}>
                    <option value="-1">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />


                <Form.Label htmlFor="employeeType">Employee Type</Form.Label>
                <Form.Group controlId="formEmployeeType">
                  <Form.Control
                    as="select"
                    name="employeeType"
                    onChange={this.handleChange}
                    isInvalid={!!errors.employeeType}>
                    <option value="-1">Select Employee Type</option>
                    <option value="FullTime">FullTime</option>
                    <option value="PartTime">PartTime</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.employeeType}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />

                {/* CURRENT STATUS */}
                <Form.Label htmlFor="currentStatus">Current Status</Form.Label>
                <Form.Group className="employee-radio-btn">
                  <Form.Check
                    type="radio"
                    id="working"
                    name="currentStatus"
                    value={true}
                    label="Working"
                    defaultChecked></Form.Check>

                  <Form.Check
                    type="radio"
                    id="retired"
                    name="currentStatus"
                    value={false}
                    label="Retired"></Form.Check>
                </Form.Group>

                <div className="col-md-12 text-center">
                  <button className="btn btn-success px-4">Add</button>
                  <Link to="/employees" className="btn btn-danger px-4 mr-3 btn-cancel">
                    Cancel
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EmployeeCreate);
