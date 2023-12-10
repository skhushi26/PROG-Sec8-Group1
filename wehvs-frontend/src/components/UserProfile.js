import React, { Component } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import axios from "axios";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      isCancelSubscriptionModalOpen: false,
      selectedCountry: null,
      selectedCity: null,
      countries: [
        { value: "usa", label: "USA" },
        { value: "canada", label: "Canada" },
      ],
      cities: [
        { value: "new-york", label: "New York", country: "usa" },
        { value: "los-angeles", label: "Los Angeles", country: "usa" },
        { value: "toronto", label: "Toronto", country: "canada" },
        { value: "vancouver", label: "Vancouver", country: "canada" },
      ],
      user: {
        firstName: "",
        lastName: "",
        email: "",
        contactEmail: "",
        telephone: "",
        dateOfBirth: "",
        address: "",
        country: "",
        city: "",
        province: "",
        zipCode: "",
        mobileNumber: "",
        profilePhoto: "",
      },
      firstNameError: "",
      lastNameError: "",
      telephoneError: "",
      dateOfBirthError: "",
      addressError: "",
      errors: null,
      loading: false, // Change it to true while getting data from API
    };
  }

  componentDidMount() {
    // Retrieve user ID and role from localStorage
    const userId = localStorage.getItem("userId");
    const isPaymentDone = localStorage.getItem("isPaymentDone");

    // Set the userId in the component's state
    this.setState({ userId });
    this.setState({ isPaymentDone });

    // Make an API request to get the user data
    axios
      .get(`http://localhost:3333/users/getById/${userId}`)
      .then((response) => {
        const user = { ...response.data.data };
        user.dateOfBirth = user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "";
        if (user.addressId) {
          user.address = user.addressId.address;
          user.country = user.addressId.country;
          user.city = user.addressId.city;
          user.province = user.addressId.province;
          user.zipCode = user.addressId.zipCode;
        }
        if (user.contactId) {
          user.telephone = user.contactId.telephone;
          user.contactEmail = user.contactId.contactEmail;
        }

        // Set the state with the fetched user data
        this.setState({ user });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  validateUser = (e) => {
    e.preventDefault();

    const { firstName, lastName, dateOfBirth, telephone, address } = this.state.user;

    let valid = true;

    // First name validation
    if (firstName === "") {
      this.setState({ firstNameError: "First Name is required" });
      valid = false;
    } else {
      this.setState({ firstNameError: "" });
    }

    // Last name validation
    if (lastName === "") {
      this.setState({ lastNameError: "Last Name is required" });
      valid = false;
    } else {
      this.setState({ lastNameError: "" });
    }

    // Telephone validation
    if (telephone === "") {
      this.setState({ telephoneError: "Telephone is required" });
      valid = false;
    } else {
      this.setState({ telephoneError: "" });
    }

    // Date of Birth validation
    if (dateOfBirth === "") {
      this.setState({ dateOfBirthError: "Date of Birth is required" });
      valid = false;
    } else {
      // Convert the date from yyyy-mm-dd format to a Date object
      const dateOfBirthDate = new Date(dateOfBirth + "T00:00:00.000Z");

      if (dateOfBirthDate != undefined && isNaN(dateOfBirthDate.getTime())) {
        this.setState({ dateOfBirthError: "Invalid Date of Birth" });
        valid = false;
      } else {
        this.setState({ dateOfBirthError: "" });
      }
    }

    // Address validation
    if (address === "") {
      this.setState({ addressError: "Address is required" });
      valid = false;
    } else {
      this.setState({ addressError: "" });
    }

    // Address validation
    if (address === "") {
      this.setState({ addressError: "Address is required" });
      valid = false;
    } else {
      this.setState({ addressError: "" });
    }

    if (valid) {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      address,
      country,
      city,
      province,
      zipCode,
      telephone,
      mobileNumber,
      contactEmail,
      profilePhoto,
    } = this.state.user;

    // Retrieve userId from the component's state
    const userId = this.state.userId;

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("address", address);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("zipCode", zipCode);
      formData.append("telephone", telephone);
      formData.append("mobileNumber", mobileNumber);
      formData.append("contactEmail", contactEmail);
      formData.append("profilePhoto", profilePhoto);

      console.log("formData", formData);
      const response = await axios.put(`http://localhost:3333/users/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      if (response.data.statusCode === 200) {
        this.setState({ successMessage: "User updated successfully!" });
      } else {
        this.setState({ errorMessage: "Invalid data provided" });
      }
    } catch (error) {
      this.setState({ errorMessage: "Something went wrong, please try again!" });
    }
  };

  handleCountryChange = (selectedOption) => {
    this.setState({ selectedCountry: selectedOption, selectedCity: null });
  };

  handleCityChange = (selectedOption) => {
    this.setState({ selectedCity: selectedOption });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          profilePhoto: file,
        },
        uploadedPhoto: true,
      }));
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
      dateOfBirthError: "",
    }));
  };



  toggleCancelSubscriptionModal = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      isCancelSubscriptionModalOpen: !prevState.isCancelSubscriptionModalOpen,
    }));
  };

  handleCancelSubscriptionConfirm = (e) => {
    // User confirmed cancellation, proceed with cancelSubscription
    e.preventDefault();
    this.cancelSubscription();
  };

  cancelSubscription = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const paymentTrackingId = localStorage.getItem('paymentTrackingId');
      const response = await axios.post('http://localhost:3333/checkout/cancel-subscription', { paymentTrackingId, userId });
      // Handle successful subscription cancellation
      if (response.status == 200){
      console.log(response.data.message);
      localStorage.setItem('isPaymentDone', false);
      localStorage.setItem('paymentTrackingId', paymentTrackingId);
      this.setState({ successMessage: response.data.message, isPaymentDone: false, errorMessage: null, isCancelSubscriptionModalOpen: false });
    }
    } catch (error) {
      // Handle errors for canceling subscription
      console.error('Error canceling subscription:', error);
      this.setState({ errorMessage: 'Unable to cancel subscription', successMessage: null, isCancelSubscriptionModalOpen: false });
    }
  };

  render() {
    const { user, loading, isPaymentDone, isCancelSubscriptionModalOpen } = this.state;
    const {
      errorMessage,
      successMessage,
      firstNameError,
      lastNameError,
      telephoneError,
      dateOfBirthError,
      addressError,
    } = this.state;

    let profilePhotoUrl = "";

    if (this.state.uploadedPhoto) {
      console.log("this.state.user", this.state.user);
      profilePhotoUrl = user.profilePhoto
        ? URL.createObjectURL(user.profilePhoto)
        : "images/default-profile.png";
    } else {
      profilePhotoUrl = user.profilePhoto
        ? `http://localhost:3333/${user.profilePhoto}`
        : "images/default-profile.png";
    }

    return (
      <div>

        {/* Confirm Cancel Subscription Modal */}
        <div
          className={`modal fade ${isCancelSubscriptionModalOpen ? "show fade-in" : ""
            }`}
          style={{
            display: isCancelSubscriptionModalOpen ? "block" : "none",
          }}
          id="cancelSubscriptionModal"
          tabIndex="-1"
          aria-labelledby="cancelSubscriptionModalLabel"
          aria-hidden={!isCancelSubscriptionModalOpen}
        >
          <div className="modal-dialog modal-dialog-subs">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cancelSubscriptionModalLabel">
                  Cancel Subscription
                </h5>
                <button
                  type="button"
                  className="btn-popup bg-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => this.toggleCancelSubscriptionModal(e)}
                >X</button>
              </div>
              <div className="modal-body py-4">
                Do you want to cancel the subscription?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-popup btn-danger"
                  data-bs-dismiss="modal"
                  onClick={(e) => this.toggleCancelSubscriptionModal(e)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-popup btn-success"
                  onClick={(e) => this.handleCancelSubscriptionConfirm(e)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="row container">
          <div className="col-lg-12">
            {loading ? (
              <p className="loading">Loading user data...</p>
            ) : (
              <form
                className="form-contact contact_form"
                method="post"
                id="contactForm"
                onSubmit={this.validateUser}
              >
                {errorMessage && (
                  <div className="alert alert-danger" role="alert" bis_skin_checked="1">
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success" role="alert" bis_skin_checked="1">
                    {successMessage}
                  </div>
                )}

                <div className="col-12">
                  <h2 className="contact-title">User Profile</h2>
                </div>

                <div className="row">
                  <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      <img className="rounded-circle" width="150px" height="150px" src={profilePhotoUrl} alt="Profile"></img>
                      <label htmlFor="fileInput" className="button button-contactForm btn-change-picture boxed-btn mt-4" >
                        Change Profile Photo
                        <input type="file" id="fileInput" name="profilePhoto" accept=".jpg, .jpeg, .png" onChange={this.handleFileChange} style={{ display: "none" }} />
                      </label>

                      <br></br>
                      <div className="col-md-12 border-bottom mt-4 mb-2"></div>

                      {isPaymentDone == "true" ?
                        <button className="button button-contactForm btn-change-picture boxed-btn mt-4" onClick={(e) => this.toggleCancelSubscriptionModal(e)}>Cancel Subscription</button> : null
                      }

                      {/* <button className="button button-contactForm btn-change-picture boxed-btn mt-4" onClick={this.cancelSubscription}>Cancel Subscription</button> */}
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-sm-6  mt-4">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          className={`form-control ${firstNameError && "is-invalid"}`}
                          name="firstName"
                          id="firstName"
                          type="text"
                          placeholder="First Name"
                          onChange={this.handleInputChange}
                          defaultValue={user.firstName}
                        />
                        {firstNameError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{firstNameError}</span>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mt-4">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          className={`form-control ${lastNameError && "is-invalid"}`}
                          name="lastName"
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          onChange={this.handleInputChange}
                          defaultValue={user.lastName}
                        />
                        {lastNameError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{lastNameError}</span>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6  mt-4">
                        <label htmlFor="email">Email</label>
                        <input
                          className="form-control valid"
                          name="email"
                          id="email"
                          type="text"
                          placeholder="Email"
                          defaultValue={user.email}
                          disabled
                        />
                      </div>
                      <div className="col-sm-6 mt-4">
                        <label htmlFor="telephone">Telephone</label>
                        <input
                          className={`form-control ${telephoneError && "is-invalid"}`}
                          name="telephone"
                          id="telephone"
                          type="text"
                          placeholder="Telephone"
                          onChange={this.handleInputChange}
                          defaultValue={user.telephone}
                        />
                        {telephoneError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{telephoneError}</span>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mt-4">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                          className={`form-control ${dateOfBirthError && "is-invalid"}`}
                          name="dateOfBirth"
                          id="dateOfBirth"
                          type="date"
                          placeholder="Select Date of Birth"
                          onChange={this.handleInputChange}
                          defaultValue={user.dateOfBirth}
                        />
                        {dateOfBirthError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{dateOfBirthError}</span>
                          </div>
                        )}
                      </div>
                      <div className="col-12 mt-6 contact-info">
                        <h5>Contact Information</h5>
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="address">Address</label>
                        <input
                          className={`form-control ${addressError && "is-invalid"}`}
                          name="address"
                          id="address"
                          type="text"
                          placeholder="Address"
                          onChange={this.handleInputChange}
                          defaultValue={user.address}
                        />
                        {addressError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{addressError}</span>
                          </div>
                        )}
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="country">Country</label>
                        <input
                          className="form-control valid"
                          name="country"
                          id="country"
                          type="text"
                          placeholder="Country"
                          defaultValue={user.country}
                        />
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="city">City</label>
                        <input
                          className="form-control valid"
                          name="city"
                          id="city"
                          type="text"
                          placeholder="City"
                          defaultValue={user.city}
                        />
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="province">Province</label>
                        <input
                          className="form-control valid"
                          name="province"
                          id="province"
                          type="text"
                          placeholder="Province"
                          defaultValue={user.province}
                        />
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                          className="form-control valid"
                          name="zipCode"
                          id="zipCode"
                          type="text"
                          placeholder="Zip Code"
                          defaultValue={user.zipCode}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 form-group mt-5">
                  <button
                    type="submit"
                    className="button button-contactForm button-submit boxed-btn"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <FooterMenu />
      </div >
    );
  }
}

export default withRouter(UserProfile);
