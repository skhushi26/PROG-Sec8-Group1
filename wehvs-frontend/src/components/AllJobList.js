import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AllJobList = () => {
    const { token } = useParams();
    const [requests, setJoblist] = useState([]);

  
    useEffect(() => {
      fetch("http://localhost:3333/job-post/get-all-for-user")
        .then((response) => response.json())
        .then((data) => {
          console.log("data.data", data.data);
          setJoblist(data.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [requests]);
    const fetchJobDataById = async (id) => {
        try {
          const response = await fetch(`http://localhost:3333/job-post/find/${id}`);
          const data = await response.json();
          return data.data;
        } catch (error) {
          console.error("Error fetching job data:", error);
          return null;
        }
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
                    <label className="container">Full Time
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Part Time
                      <input type="checkbox" checked="checked active" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Remote
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Freelance
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="single-listing">
                  <div className="select-Categories pt-80 pb-50">
                    <div className="small-section-tittle2">
                      <h4>Experience</h4>
                    </div>
                    <label className="container">Entry Level
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Mid Senior Level
                      <input type="checkbox" checked="checked active" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Associate
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container">Experienced
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <section className="featured-job-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="count-job mb-35">
                        <span>6 Jobs found</span>
                        <div className="select-job-items">
                          {/* <span>Sort by</span>
                          <select name="select" style={{ display: 'none' }}>
                            <option value="">None</option>
                            <option value="">job list</option>
                            <option value="">job list</option>
                            <option value="">job list</option>
                          </select> */}
                          <div style={{ display: 'none' }}>
                            <span className="current">None</span>
                            <ul className="list">
                              <li data-value="" className="option selected">None</li>
                              <li data-value="" className="option">job list</li>
                              <li data-value="" className="option">job list</li>
                              <li data-value="" className="option">job list</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {requests &&
                    requests.map((request, index) => (
                            <div className="single-job-items mb-30 custom-job-item">
                            <div className="job-items">
                                <div className="company-img">
                                <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                                </div>
                                <div className="job-tittle job-tittle2">
                                <a href="#">
                                    <h4>{request.jobTitle}</h4>
                                </a>
                                <ul>
                                    <li><i className="fas fa-map-marker-alt"></i>{request.address}</li>
                                    <li>Full Time</li>
                                </ul>
                                </div>
                            </div>
                            <div className="items-link items-link2 f-right">
                                <a href={`/job-list/${request._id}`}>Apply now</a>
                            </div>
                            </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

    {/* <FooterMenu /> */}
    </div>
  );
};

export default AllJobList;