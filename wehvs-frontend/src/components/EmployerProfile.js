import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";
// import './css/employerprofile.css';

class EmployerProfile extends Component {
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


    validateForm = (employee) => {
        const errors = {};
        let isValid = true;

        this.setState({errors});
        return isValid;
    };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.employeeAddForm;
    const isValid = this.validateForm(form);

    if (isValid) {
        this.createEmployee({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            age: parseInt(form.age.value),
            dateOfJoining: form.dateOfJoining.value,
            title: form.title.value,
            department: form.department.value,
            employeeType: form.employeeType.value,
            currentStatus: form.currentStatus.value === 'true'
        });

        // Clear the values after submit
        form.firstName.value = '';
        form.lastName.value = '';
        form.age.value = '';
        form.dateOfJoining.value = '';
        form.title.value = '-1';
        form.department.value = '-1';
        form.employeeType.value = '-1';
        form.currentStatus.value = '';
    }

    };

  handleChange = (e) => {
    const { name } = e.target;
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  handleAddressChange = (event) => {
    const addressInput = event.target.value;
  
    // Use the Google Maps Places API to fetch autocomplete suggestions
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: addressInput,
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Handle the autocomplete suggestions here
          console.log(predictions);
        }
      }
    );
  };

  handleSelectAddress = (selectedAddress) => {
    // Update your form's state or use any other logic to store the selected address
  };

  render() {
    const { errors, successMessage, errorMessage } = this.state;
    return (
      <div>
      {/* CONTENT */}
      <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="/images/google-logo.png"></img><span className="font-weight-bold">Google</span><span className="text-black-50">career@google.com</span><span> </span></div>
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Company Name</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">License Number</label><input type="text" className="form-control" defaultValue=" "></input></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Email ID</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">Contact Number</label><input type="phone" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-12"><label className="labels">Founded Date</label><input type="date" className="form-control" defaultValue=" "></input></div>
                            {/* <div className="col-md-12"><label className="labels">Description</label><input type="text" className="form-control" defaultValue=" "></input> </div> */}
                            <div className="col-sm-12">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description" id="description" placeholder=""></textarea>
                                </div>
                            <div className="col-md-6"><label className="labels">Address</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">City</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">Province</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            <div className="col-md-12"><label className="labels">Zip Code</label><input type="text" className="form-control" defaultValue=" "></input></div>
                            
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" defaultValue=" "></input></div>
                            <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue=" " placeholder="state"></input></div>
                        </div>
                        <div className="mt-5 text-center"><button type="submit" className="button button-contactForm button-submit boxed-btn">SAVE</button></div>
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div>
                        <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value=""></input></div>
                        <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value=""></input></div>
                    </div>
                </div> */}
            </div>
            
        </div>
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
               <div className="row footer-wejed d-flex justify-content-around">
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

export default withRouter(EmployerProfile);
