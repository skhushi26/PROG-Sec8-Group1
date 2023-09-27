import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class UserCreate extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div>
      {/* CONTENT */}
      <div className="row container">
                    <div className="col-lg-12">
                        <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm">
                    <div className="col-12">
                        <h2 className="contact-title">Register</h2>
                    </div>
                            <div className="row">
                                <div className="col-sm-6  mt-4">
                                    <label htmlFor="firstName">First Name</label>
                                    <input className="form-control valid" name="firstName" id="firstName" type="text"  placeholder="First Name"/>
                                </div>
                                <div className="col-sm-6 mt-4">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input className="form-control valid" name="lastName" id="lastName" type="text"   placeholder="Last Name"/>
                                </div>
                                <div className="col-sm-6  mt-4">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control valid" name="email" id="email" type="text"  placeholder="Email"/>
                                </div>
                                <div className="col-sm-6 mt-4">
                                    <label htmlFor="contactNumber">Contact Number</label>
                                    <input className="form-control valid" name="contactNumber" id="contactNumber" type="text"  placeholder="Contact Number"/>
                                </div>
                                <div className="col-sm-6  mt-4">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input className="form-control" name="dateOfBirth" id="dateOfBirth" type="date" placeholder="Select Date of Birth"/>
                                </div>
                                
                                <h4>Address</h4>
                                <div className="input-group-icon mt-10">
								<div className="icon"><i className="fa fa-thumb-tack" aria-hidden="true"></i></div>
								    <input type="text" name="address" placeholder="Address" required className="single-input"/>
							    </div>
							    
                                <div className="col-sm-6 mt-4">
                                    <div className="icon"><i className="fa fa-plane" aria-hidden="true"></i></div>
                                    <div className="form-select" id="default-select">
                                        <select>
                                            <option value=" 1">City</option>
                                            <option value="1">Dhaka</option>
                                            <option value="1">Dilli</option>
                                            <option value="1">Newyork</option>
                                            <option value="1">Islamabad</option>
                                        </select>
                                    </div>
                                </div>
       
                                <div className="col-sm-6 mt-4">
                                    <div className="icon"><i className="fa fa-globe" aria-hidden="true"></i></div>
                                    <div className="form-select" id="default-select">
                                        <select>
                                            <option value=" 1">Country</option>
                                            <option value="1">Bangladesh</option>
                                            <option value="1">India</option>
                                            <option value="1">England</option>
                                            <option value="1">Srilanka</option>
                                        </select>
                                    </div>
                                </div> 
                            </div>
                            <div className="form-group mt-3">
                                <button type="submit" className="button button-contactForm boxed-btn">Send</button>
                            </div>
                        </form>
                    </div>
                </div>

      {/* FOOTER */}
       <div className="footer-area footer-bg footer-padding">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                       <div className="single-footer-caption mb-50">
                         <div className="single-footer-caption mb-30">
                             <div className="footer-tittle">
                                 <h4>About Us</h4>
                                 <div className="footer-pera">
                                     <p>WEHVS focus on enabling everyone to leverage their work experience and skills anywhere in the world.</p>
                                </div>
                             </div>
                         </div>

                       </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Contact Info</h4>
                                <ul>
                                    <li>
                                    <p>60 Frederick St
                                    Kitchener, ON.</p>
                                    </li>
                                    <li><a href="#">Phone : +8880 44338899</a></li>
                                    <li><a href="#">Email : info@wehvs.com</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>IMPORTANT LINKS</h4>
                                <ul>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">Login/ Register</a></li>
                                    <li><a href="#">Press Releases</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Newsletter</h4>
                                <div className="footer-pera footer-pera2">
                                 <p>Get timely updates from WEHVS, and discover other tools and publications</p>
                             </div>
                             <div className="footer-form" >
                                 <div id="mc_embed_signup">
                                     <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                     method="get" className="subscribe_form relative mail_part">
                                         <input type="email" name="email" id="newsletter-form-email" placeholder="Email Address"
                                         className="placeholder hide-on-focus" />
                                         <div className="form-icon">
                                             <button type="submit" name="submit" id="newsletter-submit"
                                             className="email_icon newsletter-submit button-contactForm"><img src="/images/logo/form.png" alt=""/></button>
                                         </div>
                                         <div className="mt-10 info"></div>
                                     </form>
                                 </div>
                             </div>
                            </div>
                        </div>
                    </div>
                </div>
               <div className="row footer-wejed justify-content-between">
                       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                          <div className="footer-logo mb-20">
                            <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt=""/></a>
                          </div>
                       </div>
                       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                        <div className="footer-tittle-bottom">
                            <span>5000+</span>
                            <p>Verified Employers</p>
                        </div>
                       </div>
                       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="footer-tittle-bottom">
                                <span>3000+</span>
                                <p>Talented Workers</p>
                            </div>
                       </div>
                       <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                            <div className="footer-tittle-bottom">
                                <span>500+</span>
                                <p>Skilled Jobs</p>
                            </div>
                       </div>
               </div>
            </div>
        </div>

      </div>
    );
  }
}

export default withRouter(UserCreate);
