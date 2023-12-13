import React, { useState, useEffect } from "react";
import FooterMenu from "./Footer";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { DOMAIN_URI } from "../config";

const JobPostingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setsalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [address, setAddress] = useState("");
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");

  const [jobTitleError, setJobTitleError] = useState("");
  const [salaryError, setsalaryError] = useState("");
  const [jobDescriptionError, setJobDescriptionError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [experienceLevelsError, setExperienceLevelsError] = useState("");
  const [jobTypesError, setJobTypesError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [requests, setJoblist] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    fetch(`${DOMAIN_URI}/job-post/get-all-for-employer/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data.data", data.data);
        setJoblist(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchExperienceLevels = async () => {
    const response = await fetch(`${DOMAIN_URI}/job-post/experience-level`);
    const data = await response.json();
    setExperienceLevels(data.data);
  };

  const fetchJobTypes = async () => {
    const response = await fetch(`${DOMAIN_URI}/job-post/job-types`);
    const data = await response.json();
    setJobTypes(data.data);
  };

  useEffect(() => {
    fetchExperienceLevels();
    fetchJobTypes();
  }, []);

  useEffect(() => {
    if (showModal && editMode && editId) {
      fetchJobDataById(editId).then((jobData) => {
        if (jobData) {
          setJobTitle(jobData.jobTitle);
          setJobDescription(jobData.jobDescription);
          setAddress(jobData.address);
          setSelectedExperienceLevel(jobData.jobExperienceLevelId);
          setSelectedJobType(jobData.jobTypeId);
        }
      });
    } else {
      setJobTitle("");
      setJobDescription("");
      setAddress("");
      setSelectedExperienceLevel("");
      setSelectedJobType("");
    }
  }, [showModal, editMode, editId]);

  const fetchJobDataById = async (id) => {
    try {
      const response = await fetch(`${DOMAIN_URI}/job-post/find/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching job data:", error);
      return null;
    }
  };

  const resetForm = () => {
    setJobTitle("");
    setJobDescription("");
    setAddress("");
    setSelectedExperienceLevel("");
    setSelectedJobType("");

    setJobTitleError("");
    setJobDescriptionError("");
    setAddressError("");
    setExperienceLevelsError("");
    setJobTypesError("");
  };

  useEffect(() => {
    resetForm();
  }, [showModal]);

  const handleAddJobClick = () => {
    setEditMode(false);
    setEditId(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    let valid = true;

    if (jobTitle.trim() === "") {
      setJobTitleError("Job Title is required");
      valid = false;
    } else {
      setJobTitleError("");
    }
    if (salary.trim() === "") {
      setsalaryError("Job salary is required");
      valid = false;
    } else {
      setsalaryError("");
    }

    if (jobDescription.trim() === "") {
      setJobDescriptionError("Job Description is required");
      valid = false;
    } else {
      setJobDescriptionError("");
    }

    if (address.trim() === "") {
      setAddressError("Address is required");
      valid = false;
    } else {
      setAddressError("");
    }

    if (selectedExperienceLevel.trim() === "") {
      setExperienceLevelsError("Experience Level is required");
      valid = false;
    } else {
      setExperienceLevelsError("");
    }

    if (selectedJobType.trim() === "") {
      setJobTypesError("Job Type is required");
      valid = false;
    } else {
      setJobTypesError("");
    }

    if (valid) {
      const apiUrl = editMode
        ? `${DOMAIN_URI}/job-post/update/${editId}`
        : `${DOMAIN_URI}/job-post/add`;

      const employerId = localStorage.getItem("userId");
      const requestBody = {
        employerId,
        jobTitle,
        salary,
        jobDescription,
        jobTypeId: selectedJobType,
        address,
        jobExperienceLevelId: selectedExperienceLevel,
      };

      const requestOptions = {
        method: editMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
          toast.success(`${editMode ? "Job updated" : "Job added"} successfully`);
        } else {
          toast.error(
            `Something went wrong in ${editMode ? "updating" : "adding"} job. Please try again!`
          );
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          `Something went wrong in ${editMode ? "updating" : "adding"} job. Please try again!`
        );
      }

      setShowModal(false);
    }
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setEditId(id);
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job post?");

    if (confirmDelete) {
      try {
        const response = await fetch(`${DOMAIN_URI}/job-post/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setJoblist((prevJobs) => prevJobs.filter((job) => job._id !== id));
          toast.success("Job deleted successfully");
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <div>
      {/* <div className="jobportal"><h2><strong>Welcome to Job Portal Database</strong></h2></div> */}
      <div className="containertable">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Job Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests &&
              requests.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobDescription}</td>
                  <td>
                    <Button onClick={() => handleEdit(job._id)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(job._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Button onClick={handleAddJobClick}>Add Job</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Update Job" : "Add Job"}</Modal.Title>
        </Modal.Header> */}
        <div className="modal-header">
          <h5 className="modal-title" id="addCommentModalLabel">
            {editMode ? "Update Job" : "Add Job"}
          </h5>
          <button
            type="button"
            className="btn-popup bg-light"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
        <Modal.Body>
          <Form>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <span className="error-message text-danger">{jobTitleError}</span>
            </Form.Group>
            <br />
            <br />
            <Form.Group controlId="jobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <span className="error-message text-danger">{jobDescriptionError}</span>
            </Form.Group>
            <br />
            <br />
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job salary"
                value={salary}
                onChange={(e) => setsalary(e.target.value)}
              />
              <span className="error-message text-danger">{salaryError}</span>
            </Form.Group>
            <br />
            <br />

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span className="error-message text-danger">{addressError}</span>
            </Form.Group>
            <br />
            <br />

            <Form.Group controlId="experienceLevel">
              <Form.Label>Job Experience Level</Form.Label>
              <Form.Control
                as="select"
                value={selectedExperienceLevel}
                onChange={(e) => setSelectedExperienceLevel(e.target.value)}
              >
                <option value="">Select Experience Level</option>
                {Array.isArray(experienceLevels) && experienceLevels.length > 0 ? (
                  experienceLevels.map((level) => (
                    <option key={level._id} value={level._id}>
                      {level.jobExperienceLevel}
                    </option>
                  ))
                ) : (
                  <option value="">No Experience Levels Available</option>
                )}
              </Form.Control>
              <span className="error-message text-danger">{experienceLevelsError}</span>
            </Form.Group>
            <br />
            <br />

            <Form.Group controlId="jobType">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                as="select"
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option value="">Select Job Type</option>
                {Array.isArray(jobTypes) && jobTypes.length > 0 ? (
                  jobTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.jobType}
                    </option>
                  ))
                ) : (
                  <option value="">No Job Types Available</option>
                )}
              </Form.Control>
              <span className="error-message text-danger">{jobTypesError}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button onClick={handleAddJob}>{editMode ? "Update Job" : "Add Job"}</Button>
        </Modal.Footer>
      </Modal>
      {/* FOOTER */}
      <FooterMenu />
    </div>
  );
};

export default JobPostingList;
