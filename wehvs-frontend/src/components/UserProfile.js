import { Component } from "react";
import withRouter from "./Router/withRouter";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            selectedCountry: null,
            selectedCity: null,
            countries: [
                { value: 'usa', label: 'USA' },
                { value: 'canada', label: 'Canada' }
            ],
            cities: [
                { value: 'new-york', label: 'New York', country: 'usa' },
                { value: 'los-angeles', label: 'Los Angeles', country: 'usa' },
                { value: 'toronto', label: 'Toronto', country: 'canada' },
                { value: 'vancouver', label: 'Vancouver', country: 'canada' },
            ],

            // This part will bechanged after getting information from API.
            user: {
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@example.com",
                contactNumber: "123-456-7890",
                dateOfBirth: "1990-01-01",
                address: "123 Main Street",
                country: "Canada",
                city: "Waterloo",
                province: "ON",
                zipCode: "N2T-2Y7"
            },
            loading: false // Change it to true while getting data from API
        };
    }

    // employer/:id
  // Fetch user data based on user ID when the component mounts
//   componentDidMount() {
//     const userId = "65174acc06fd7898681f5c3b"; // it will be replaced with the value stored in session after login 
//     fetch(`https://localhost:3333/employer/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({ user: data, loading: false });
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         this.setState({ loading: false });
//       });
//   }

    
    handleCountryChange = (selectedOption) => {
        this.setState({ selectedCountry: selectedOption, selectedCity: null });
    };

    handleCityChange = (selectedOption) => {
        this.setState({ selectedCity: selectedOption });
    };

    render() {
        const { user, loading } = this.state;

        return (
            <div>
                {/* CONTENT */}
                <div className="row container">
                    <div className="col-lg-12">

                        {loading ? (
                            <p className="loading">Loading user data...</p>
                        ) : (

                            <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm">
                                <div className="col-12">
                                    <h2 className="contact-title">User Profile</h2>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="firstName">First Name</label>
                                        {/* <input className="form-control valid" name="firstName" id="firstName" type="text"  placeholder="First Name"/> */}
                                        <input className="form-control valid" name="firstName" id="firstName" type="text" placeholder="First Name" defaultValue={user.firstName} />

                                    </div>
                                    <div className="col-sm-6 mt-4">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input className="form-control valid" name="lastName" id="lastName" type="text" placeholder="Last Name" defaultValue={user.lastName} />
                                    </div>
                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control valid" name="email" id="email" type="text" placeholder="Email" defaultValue={user.email} />
                                    </div>
                                    <div className="col-sm-6 mt-4">
                                        <label htmlFor="contactNumber">Contact Number</label>
                                        <input className="form-control valid" name="contactNumber" id="contactNumber" type="text" placeholder="Contact Number" defaultValue={user.contactNumber} />
                                    </div>
                                    <div className="col-sm-6 mt-4">
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <input className="form-control" name="dateOfBirth" id="dateOfBirth" type="date" placeholder="Select Date of Birth" defaultValue={user.dateOfBirth} />
                                    </div>
                                    <div className="col-12 mt-6 contact-info">
                                        <h5>Contact Information</h5>
                                    </div>


                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="address">Address</label>
                                        <input className="form-control valid" name="address" id="address" type="text" placeholder="Address" defaultValue={user.address} />
                                    </div>


                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="country">Country</label>
                                        <input className="form-control valid" name="country" id="country" type="text" placeholder="Country" defaultValue={user.country} />
                                    </div>

                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="city">City</label>
                                        <input className="form-control valid" name="city" id="city" type="text" placeholder="City" defaultValue={user.city} />
                                    </div>


                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="province">Province</label>
                                        <input className="form-control valid" name="province" id="province" type="text" placeholder="Province" defaultValue={user.province} />
                                    </div>

                                    <div className="col-sm-6  mt-4">
                                        <label htmlFor="zipCode">Zip Code</label>
                                        <input className="form-control valid" name="zipCode" id="zipCode" type="text" placeholder="Zip Code" defaultValue={user.zipCode} />
                                    </div>

                                </div>
                                <div className="col-12 form-group mt-5">
                                    <button type="submit" className="button button-contactForm button-submit boxed-btn">Send</button>
                                </div>
                            </form>
                        )}
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

export default withRouter(UserProfile);
