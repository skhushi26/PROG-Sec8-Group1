import { Component } from "react";
import { Form } from "react-bootstrap";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      errors: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateUser = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    let valid = true;

    console.log("email:", email);
    console.log("password:", password);

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      this.setState({ emailError: "Email is required" });
      valid = false;
    } else if (!email.match(emailPattern)) {
      console.log("are you here emailpattern?");
      this.setState({ emailError: "Invalid email address" });
      console.log("email error:" + this.state.emailError);
      valid = false;
      console.log("valid value:"+ valid);
    } else {
      console.log("or not??");
      this.setState({ emailError: "" });
    }

    // Password validation
    if (password === "") {
      this.setState({ passwordError: "Password is required" });
      valid = false;
    } else if (password.length < 8) {
      this.setState({ passwordError: "Password must be at least 8 characters long" });
      valid = false;
    } else {
      this.setState({ passwordError: "" });
    }

    if (valid) {
      this.handleSubmit();
    }
  };


  handleSubmit = async () => {
    const { email, password } = this.state;

    try {
      const response = await axios.post('http://localhost:3333/users/login', { email, password });
      console.log('Response2:', response.data); // Log the response data

      if (response.statusCode === 200) {
        // Login successful, store the token in localStorage or a global state
        localStorage.setItem('token', response.data.token);
      } else {
        this.setState({ errorMessage: "Invalid credentials" });
      }
    } catch (error) {
      this.setState({ errorMessage: "Something went wrong, please try again!" });
      console.error(error);
    }
  };
  render() {
    const { errorMessage, emailError, passwordError } = this.state;
    return (
      <div>
        {/* CONTENT */}
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 mt-1">
            <form className="form-contact contact_form" onSubmit={this.validateUser} method="post" id="contactForm">
              <div className="row">
                <div className="col-12">
                  <h2 className="contact-title">Login</h2>
                </div>
                <div className="col-sm-10 m-auto">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className={`form-control ${emailError && "is-invalid"}`}
                      name="email" id="email" type="text" onChange={this.handleInputChange} placeholder="Email" />
                    {emailError && <div className="invalid-feedback"><span className="text-danger float-left">{emailError}</span></div>}

                  </div>
                </div>
                <div className="col-sm-10 m-auto">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className={`form-control ${passwordError && "is-invalid"}`} name="password" id="password" type="password" onChange={this.handleInputChange} placeholder="Password" />
                    {passwordError && <div className="invalid-feedback"><span className="text-danger float-left">{passwordError}</span></div>}
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

export default withRouter(Login);
