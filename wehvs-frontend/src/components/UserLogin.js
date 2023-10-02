import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class UserLogin extends Component {
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

  createEmployee = (employee, form) => {
    fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee }),
    })
      .then(async (res) => {
        if (res.ok) {
          this.setState({ successMessage: "User inserted successfully!",  errorMessage: ""});
          form.reset();

          window.scrollTo(0, 0);
        } else {
          res.json().catch((err) => {
            this.setState({ errorMessage: "Something went wrong while inserting the employee.", successMessage: ""});
            console.error("err", err.message);
          });
        }
      })
      .catch((error) => {
        // console.log("error: ", error?.message || "Something went wrong!");
      });
  };

  validateForm = (employee) => {
    const errors = {};
    let isValid = true;
   
    // Perform validation for each form field

    // FIRST NAME VALIDATION
    if (employee.firstName.value.trim() === '') {
        errors.firstName = 'First name is required';
        isValid = false;
    }

    // LAST NAME VALIDATION
    if (employee.lastName.value.trim() === '') {
        errors.lastName = 'Last name is required';
        isValid = false;
    }

    // AGE VALIDATION
    if (employee.age.value.trim() === '') {
        errors.age = 'Age is required';
        isValid = false;
    }
    else if(isNaN(parseInt(employee.age.value.trim())))
    {
        errors.age = 'Age is invalid';
        isValid = false;
    }
    else if((parseInt(employee.age.value.trim()) < 20) || (parseInt(employee.age.value.trim()) > 70))
    {
        errors.age = 'Age should be between 20 and 70.';
        isValid = false;
    }

    // DATE OF JOINING VALIDATION
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD format
    if (employee.dateOfJoining.value === '') {
        errors.dateOfJoining = 'Date of Joining is required';
        isValid = false;
    }
    else if (!dateRegex.test(employee.dateOfJoining.value)) {
        errors.dateOfJoining = 'Invalid date format';
        isValid = false;
    }


    // TITLE VALIDATION
    let titles = ['Employee', 'Manager', 'Director', 'VP'];
    if(employee.title.value === '-1') {
        errors.title = 'Title is required';
        isValid = false;
    }
    else if(!titles.includes(employee.title.value)) {
        errors.title = 'Title is invalid';
        isValid = false;
    }


     // DEPARTMENT VALIDATION
     let departments = ['IT', 'Marketing', 'HR', 'Engineering'];
     if (employee.department.value === '-1') {
        errors.department = 'Department is required';
        isValid = false;
    }
    else if(!departments.includes(employee.department.value)) {
        errors.title = 'Department is invalid';
        isValid = false;
    }

    // EMPLOYEE TYPE VALIDATION
    let employeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];
    if (employee.employeeType.value === '-1') {
        errors.employeeType = 'Employee Type is required';
        isValid = false;
    }
    else if(!employeeTypes.includes(employee.employeeType.value)) {
        errors.employeeType  = 'Employee Type is invalid';
        isValid = false;
    }

    // CURRENT STATUS VALIDATION
    if (!employee.currentStatus.value) {
        errors.currentStatus = 'Current Status is required';
        isValid = false;
    }


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
      <div className="row d-flex justify-content-center">
                    <div className="col-lg-8 mt-5">
                        <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm">
                            <div className="row">
                            <div className="col-12">
                                <h2 className="contact-title">Login</h2>
                              </div>
                                <div className="col-sm-10 m-auto
                                ">
                                    <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                        <input className="form-control valid" name="email" id="email" type="email"   placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="col-sm-10 m-auto">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input className="form-control" name="password" id="password" type="password" placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-group mt-2 mb-2">
                                <button type="submit" className="button button-contactForm button-login boxed-btn">Login</button>
                            </div>
                            <div className="mt-4">
                              <p className="mb-0">Don't have an account yet? Sign Up here!</p>
                              <p className="mt-0"><a href="/employer/register">Register as Employer</a> | <a href="/user/register">Register as User</a></p>
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

export default withRouter(UserLogin);
