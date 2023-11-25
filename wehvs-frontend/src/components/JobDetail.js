import React, { useState, useEffect } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


const JobDetails = () => {
    const [jobDetail, setJobDetail] = useState({})
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3333/job-post/find/${id}`);
                const data = await response.json();
                setJobDetail(data.data);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
      <div className="job-post-company pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-7 col-lg-8">
              <div className="single-job-items mb-50">
                <div className="job-items">
                  <div className="company-img company-img-details">
                    <a href="#"><img src="assets/img/icon/job-list1.png" alt="" /></a>
                  </div>
                  <div className="job-tittle">
                      <h4>{jobDetail.jobTitle}</h4>
                    <ul>
                      <li><i className="fas fa-map-marker-alt"></i>{jobDetail.address}</li>
                    </ul>
                  </div>
                </div>
              </div>
  
              <div className="job-post-details">
                <div className="post-details1 mb-50">
                  <div className="small-section-tittle">
                    <h4>Job Description</h4>
                  </div>
                  <p className="jobdetail">{jobDetail.jobDescription}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="post-details3 mb-50">
                <div className="small-section-tittle">
                  <h4>Job Overview</h4>
                </div>
                <ul>
                  <li>Posted date: <span>12 Aug 2019</span></li>
                  <li>Location: <span>{jobDetail.address}</span></li>
                  <li>Job nature: <span>Full time</span></li>
                  <li>Salary: <span>$7,800 yearly</span></li>
                </ul>
                <div className="apply-btn2">
                  <a href="#" className="btnapply">Apply Now</a>
                </div>
              </div>
              {/* <div className="post-details4 mb-50">
                <div className="small-section-tittle">
                  <h4>Company Information</h4>
                </div>
                <span>Colorlib</span>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <ul>
                  <li>Name: <span>Colorlib </span></li>
                  <li>Web: <span>colorlib.com</span></li>
                  <li>Email: <span>carrier.colorlib@gmail.com</span></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <FooterMenu />
      </div>
    );
  };
  
  export default JobDetails;