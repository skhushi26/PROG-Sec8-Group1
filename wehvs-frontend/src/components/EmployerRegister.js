import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class EmployerRegister extends Component {
    constructor() {
        super();
        this.state = {
            selectedCountry: null,
            selectedCity: null,
            countries: [
                { value: 'usa', label: 'USA' },
                { value: 'canada', label: 'Canada' },
                // Add more countries here
            ],
            cities: [
                { value: 'new-york', label: 'New York', country: 'usa' },
                { value: 'los-angeles', label: 'Los Angeles', country: 'usa' },
                { value: 'toronto', label: 'Toronto', country: 'canada' },
                { value: 'vancouver', label: 'Vancouver', country: 'canada' },
                // Add more cities here
            ],
        };
    }

    handleCountryChange = (selectedOption) => {
        this.setState({ selectedCountry: selectedOption, selectedCity: null });
    };

    handleCityChange = (selectedOption) => {
        this.setState({ selectedCity: selectedOption });
    };


    render() {
        const { countries, cities, selectedCountry, selectedCity } = this.state;

        return (
            <div>
                {/* CONTENT */}
                <div className="row container">
                    <div className="col-lg-12">
                        <form className="form-contact contact_form" method="post" id="contactForm">
                            <div className="col-12">
                                <h1 className="contact-title">Employer Register</h1>
                            </div>

                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img className="rounded-circle " width="150px" src="/images/user.png"></img>
                                        {/* <span className="font-weight-bold">{user.firstName + " " + user.lastName}</span><span> </span> */}
                                        <button type="submit" className="button button-contactForm btn-change-picture boxed-btn mt-4">Change Profile</button>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="companyName">Company Name</label>
                                            <input className="form-control valid" name="companyName" id="companyName" type="text" placeholder="Company Name" />
                                        </div>
                                        <div className="col-sm-6 mt-4">
                                            <label htmlFor="licenseNumber">License Number</label>
                                            <input className="form-control valid" name="licenseNumber" id="licenseNumber" type="text" placeholder="License Number" />
                                        </div>
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="contactEmail">Contact Email</label>
                                            <input className="form-control valid" name="contactEmail" id="contactEmail" type="text" placeholder="Contacct Email" />
                                        </div>
                                        <div className="col-sm-6 mt-4">
                                            <label htmlFor="contactNumber">Contact Number</label>
                                            <input className="form-control valid" name="contactNumber" id="contactNumber" type="text" placeholder="Contact Number" />
                                        </div>
                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="foundedDate">Founded Date</label>
                                            <input className="form-control" name="dateOfBirth" id="dateOfBirth" type="date" placeholder="Select Date of Birth" />
                                        </div>

                                        <div className="col-sm-12  mt-4">
                                            <label htmlFor="description">Description</label>
                                            <textarea className="form-control" name="description" id="description" placeholder="Description"></textarea>
                                        </div>


                                        <div className="col-12 mt-6 contact-info">
                                            <h5>Contact Information</h5>
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="address">Address</label>
                                            <input className="form-control valid" name="address" id="address" type="text" placeholder="Address" />
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="country">Country</label>
                                            <input className="form-control valid" name="country" id="country" type="text" placeholder="Country" />
                                        </div>

                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="city">City</label>
                                            <input className="form-control valid" name="city" id="city" type="text" placeholder="City" />
                                        </div>


                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="province">Province</label>
                                            <input className="form-control valid" name="province" id="province" type="text" placeholder="Province" />
                                        </div>

                                        <div className="col-sm-6  mt-4">
                                            <label htmlFor="zipCode">Zip Code</label>
                                            <input className="form-control valid" name="zipCode" id="zipCode" type="text" placeholder="Zip Code" />
                                        </div>

                                        <div className="col-12 form-group mt-5">
                                            <button type="submit" className="button button-contactForm button-submit boxed-btn">Send</button>
                                        </div>
                                    </div>
                                </div>
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
                                                            className="email_icon newsletter-submit button-contactForm"><img src="/images/logo/form.png" alt="" /></button>
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
                                    <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt="" /></a>
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

export default withRouter(EmployerRegister);
