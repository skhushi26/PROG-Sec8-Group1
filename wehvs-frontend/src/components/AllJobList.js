import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AllJobList = () => {
  const { token } = useParams();
  const [requests, setJoblist] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedJobExperienceLevels, setSelectedJobExperienceLevels] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobExperienceLevels, setJobExperienceLevels] = useState([]);

  useEffect(() => {
    // Fetch job types and job experience levels when the component mounts
    fetch("http://localhost:3333/job-post/job-types")
      .then((response) => response.json())
      .then((data) => {
          setJobTypes(data.data);
      })
      .catch((error) => console.error("Error fetching job types:", error));

    fetch("http://localhost:3333/job-post/experience-level")
      .then((response) => response.json())
      .then((data) => {
          setJobExperienceLevels(data.data);
      })
      .catch((error) => console.error("Error fetching job experience levels:", error));
  }, []); // Empty dependency array means it runs only once when the component mounts

  useEffect(() => {
    // Fetch job list based on selected job types and job experience levels
    fetch("http://localhost:3333/job-post/get-all-for-user")
      .then((response) => response.json())
      .then((data) => {
        setJoblist(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedJobTypes, selectedJobExperienceLevels]);

  const handleJobTypeChange = (jobType) => {
    // Toggle the selected job type
    if (selectedJobTypes.includes(jobType)) {
      setSelectedJobTypes((prevSelectedJobTypes) =>
        prevSelectedJobTypes.filter((type) => type !== jobType)
      );
    } else {
      setSelectedJobTypes((prevSelectedJobTypes) => [...prevSelectedJobTypes, jobType]);
    }
  };

  const handleJobExperienceLevelChange = (jobExperienceLevel) => {
    // Toggle the selected job experience level
    if (selectedJobExperienceLevels.includes(jobExperienceLevel)) {
      setSelectedJobExperienceLevels((prevSelectedJobExperienceLevels) =>
        prevSelectedJobExperienceLevels.filter((level) => level !== jobExperienceLevel)
      );
    } else {
      setSelectedJobExperienceLevels((prevSelectedJobExperienceLevels) => [
        ...prevSelectedJobExperienceLevels,
        jobExperienceLevel,
      ]);
    }
  };

  const filterJobsByJobType = (job) => {
    const selectedTypes = selectedJobTypes.filter(Boolean);
    return selectedTypes.length === 0 || selectedTypes.includes(job.jobType?.jobType);
  };

  const filterJobsByJobExperienceLevel = (job) => {
    console.log("Selected Job Experience Levels:", selectedJobExperienceLevels);
    const selectedLevels = selectedJobExperienceLevels.filter(Boolean);
    console.log("Filtered Levels:", selectedLevels);
    return (
      selectedLevels.length === 0 ||
      selectedLevels.includes(job.jobExperienceLevel?.jobExperienceLevel)
    );
  };

  return (
    <div>
      <div className="job-listing-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="row">
                <div className="col-12">
                  <div className="small-section-tittle2 mb-45">
                    <div className="ion"></div>
                    <h4>Filter Jobs</h4>
                  </div>
                </div>
              </div>
              <div className="job-category-listing mb-50">
                <div className="single-listing">
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Job Type</h4>
                    </div>
                    {jobTypes.map((jobType) => (
                      <label key={jobType._id} className="container">
                        {jobType.jobType}
                        <input
                          type="checkbox"
                          checked={selectedJobTypes.includes(jobType.jobType)}
                          onChange={() => handleJobTypeChange(jobType.jobType)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))}
                  </div>
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Job Experience Level</h4>
                    </div>
                    {jobExperienceLevels.map((experienceLevel) => (
                      <label key={experienceLevel._id} className="container">
                        {experienceLevel.jobExperienceLevel}
                        <input
                          type="checkbox"
                          checked={selectedJobExperienceLevels.includes(
                            experienceLevel.jobExperienceLevel
                          )}
                          onChange={() =>
                            handleJobExperienceLevelChange(
                              experienceLevel.jobExperienceLevel
                            )
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <section className="featured-job-area">
                <div className="container">
                  <div className="row">
                    <div className="count-job mb-35">
                      <div className="select-job-items">
                        <div style={{ display: 'none' }}>
                          <span className="current">None</span>
                          <ul className="list">
                            <li data-value="" className="option selected">
                              None
                            </li>
                            <li data-value="" className="option">
                              job list
                            </li>
                            <li data-value="" className="option">
                              job list
                            </li>
                            <li data-value="" className="option">
                              job list
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {requests &&
                    requests
                      .filter(filterJobsByJobType)
                      .filter(filterJobsByJobExperienceLevel)
                      .map((request, index) => (
                        <div
                          className="single-job-items mb-30 custom-job-item"
                          key={index}
                        >
                          <div className="job-items">
                            <div className="company-img">
                              <a href="#">
                                <img
                                  src="assets/img/icon/job-list1.png"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="job-tittle job-tittle2">
                              <a href="#">
                                <h4>{request.jobTitle}</h4>
                              </a>
                              <ul>
                                <li>
                                  <i className="fas fa-map-marker-alt"></i>
                                  {request.address}
                                </li>
                                <li>{request.jobType.jobType}</li>
                                <li>
                                  {request.jobExperienceLevel.jobExperienceLevel}
                                </li>
                                {/* <li>{request.salary} CAD yearly</li> */}
                              </ul>
                            </div>
                          </div>
                          <div className="items-link items-link2 f-right">
                            <a href={`/job-list/${request._id}`}>
                              Apply now
                            </a>
                          </div>
                        </div>
                      ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <FooterMenu />
    </div>
  );
};
export default AllJobList;