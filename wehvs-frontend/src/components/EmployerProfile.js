import React, { Component } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import axios from "axios";
import { DOMAIN_URI } from "../config";
class EmployerProfile extends Component {
  constructor() {
    super();
    this.state = {
      employer: {
        companyName: "",
        licenseNumber: "",
        contactEmail: "",
        foundedDate: "",
        description: "",
        address: "",
        country: "",
        city: "",
        province: "",
        zipCode: "",
        mobileNumber: "",
        profilePhoto: "",
      },
      companyNameError: "",
      contactEmailError: "",
      foundedDateError: "",
      addressError: "",
      telephoneError: "",
      successMessage: "",
      errorMessage: "",
      loading: false,
    };
  }

  componentDidMount() {
    // Retrieve employer ID and role from localStorage
    const employerId = localStorage.getItem("userId");

    // Set the employerId in the component's state
    this.setState({ employerId });

    // Make an API request to get the user data
    axios
      .get(`${DOMAIN_URI}/employers/getById/${employerId}`)
      .then((response) => {
        const employer = { ...response.data.data };
        employer.foundedDate = employer.foundedDate
          ? new Date(employer.foundedDate).toISOString().split("T")[0]
          : "";
        if (employer.addressId) {
          employer.address = employer.addressId.address;
          employer.country = employer.addressId.country;
          employer.city = employer.addressId.city;
          employer.province = employer.addressId.province;
          employer.zipCode = employer.addressId.zipCode;
        }
        if (employer.contactId) {
          employer.telephone = employer.contactId.telephone;
          employer.contactEmail = employer.contactId.contactEmail;
        }

        // Set the state with the fetched employer data
        this.setState({ employer });
      })
      .catch((error) => {
        console.error("Error fetching employer data:", error);
      });
  }

  validateEmployer = (e) => {
    e.preventDefault();

    const { companyName, contactEmail, foundedDate, telephone, address } = this.state.employer;

    let valid = true;

    // Company Name validation
    if (companyName.trim() === "") {
      this.setState({ companyNameError: "Company Name is required" });
      valid = false;
    } else {
      this.setState({ companyNameError: "" });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactEmail.trim() === "") {
      this.setState({ contactEmailError: "Email is required" });
      valid = false;
    } else if (!contactEmail.match(emailPattern)) {
      this.setState({ contactEmailError: "Invalid email address" });
      valid = false;
    } else {
      this.setState({ contactEmailError: "" });
    }

    // Founded Date validation
    const inputDate = new Date(foundedDate);
    if (isNaN(inputDate)) {
      this.setState({ foundedDateError: "Founded Date is not a valid date" });
      valid = false;
    } else {
      this.setState({ foundedDateError: "" });
    }

    // Address validation
    if (address.trim() === "") {
      this.setState({ addressError: "Address is required" });
      valid = false;
    } else {
      this.setState({ addressError: "" });
    }

    // Telephone validation
    if (telephone.trim() === "") {
      this.setState({ telephoneError: "Telephone is required" });
      valid = false;
    } else {
      this.setState({ telephoneError: "" });
    }

    if (valid) {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    const {
      companyName,
      licenseNumber,
      contactEmail,
      foundedDate,
      telephone,
      address,
      description,
      country,
      city,
      province,
      zipCode,
      mobileNumber,
      profilePhoto,
    } = this.state.employer;

    // Retrieve userId from the component's state
    const userId = this.state.employerId;

    try {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("licenseNumber", licenseNumber);
      formData.append("contactEmail", contactEmail);
      formData.append("foundedDate", foundedDate);
      formData.append("address", address);
      formData.append("description", description);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("zipCode", zipCode);
      formData.append("telephone", telephone);
      formData.append("mobileNumber", mobileNumber);
      formData.append("profilePhoto", profilePhoto);

      console.log("formData", formData);
      const response = await axios.put(
        `${DOMAIN_URI}/employers/updateEmployer/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      if (response.data.statusCode === 200) {
        this.setState({ successMessage: "Employer updated successfully!" });
      } else {
        this.setState({ errorMessage: "Invalid data provided" });
      }
    } catch (error) {
      this.setState({ errorMessage: "Something went wrong, please try again!" });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      employer: {
        ...prevState.employer,
        [name]: value,
      },
      foundedDateError: "",
    }));
    console.log("new state: " + this.state.employer);
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

  handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      this.setState((prevState) => ({
        employer: {
          ...prevState.employer,
          profilePhoto: file,
        },
        uploadedPhoto: true,
      }));
    }
  };

  handleSelectAddress = (selectedAddress) => {
    // Update your form's state or use any other logic to store the selected address
  };

  render() {
    const {
      loading,
      employer,
      errorMessage,
      successMessage,
      companyNameError,
      foundedDateError,
      addressError,
      telephoneError,
    } = this.state;

    let profilePhotoUrl = "images/default-profile.png";

    if (this.state.uploadedPhoto) {
      console.log("this.state.employer", this.state.employer);
      profilePhotoUrl = employer.profilePhoto
        ? URL.createObjectURL(employer.profilePhoto)
        : "images/default-profile.png";
    } else {
      profilePhotoUrl = employer.profilePhoto
        ? `${DOMAIN_URI}/${employer.profilePhoto}`
        : "images/default-profile.png";
    }
    console.log("profilePhotoUrl: ", profilePhotoUrl);

    return (
      <div>
        {/* CONTENT */}
        <div className="row container">
          <div className="col-lg-12">
            {loading ? (
              <p className="loading">Loading employer data...</p>
            ) : (
              <form
                className="form-contact contact_form"
                method="post"
                id="contactForm"
                onSubmit={this.validateEmployer}
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
                  <h2 className="contact-title">Employer Profile</h2>
                </div>

                <div className="row">
                  <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                      <img
                        className="rounded-circle"
                        width="150px"
                        height="150px"
                        src={profilePhotoUrl}
                        alt="Profile Photo"
                      ></img>
                      <label
                        htmlFor="fileInput"
                        className="button button-contactForm btn-change-picture boxed-btn mt-4"
                      >
                        Change Profile Photo
                        <input
                          type="file"
                          id="fileInput"
                          name="profilePhoto"
                          accept=".jpg, .jpeg, .png"
                          onChange={this.handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>

                      <br></br>
                      <div className="col-md-12 border-bottom mt-4 mb-2"></div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-sm-6  mt-4">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          className={`form-control ${companyNameError && "is-invalid"}`}
                          name="companyName"
                          id="companyName"
                          type="text"
                          placeholder="Company Name"
                          onChange={this.handleInputChange}
                          defaultValue={employer.companyName}
                        />
                        {companyNameError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{companyNameError}</span>
                          </div>
                        )}
                      </div>

                      <div className="col-sm-6 mt-4">
                        <label htmlFor="licenseNumber">Last Name</label>
                        <input
                          className="form-control"
                          name="licenseNumber"
                          id="licenseNumber"
                          type="text"
                          placeholder="License Number"
                          onChange={this.handleInputChange}
                          defaultValue={employer.licenseNumber}
                        />
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="email">Email</label>
                        <input
                          className="form-control valid"
                          name="email"
                          id="email"
                          type="text"
                          placeholder="Email"
                          defaultValue={employer.email}
                          disabled
                        />
                      </div>

                      <div className="col-sm-6 mt-4">
                        <label htmlFor="foundedDate">Founded Date</label>
                        <input
                          className={`form-control ${foundedDateError && "is-invalid"}`}
                          name="foundedDate"
                          id="foundedDate"
                          type="date"
                          placeholder="Select Founded Date"
                          onChange={this.handleInputChange}
                          defaultValue={employer.foundedDate}
                        />
                        {foundedDateError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{foundedDateError}</span>
                          </div>
                        )}
                      </div>

                      <div className="col-sm-6  mt-4">
                        <label htmlFor="contactEmail">Contact Email</label>
                        <input
                          className="form-control valid"
                          name="contactEmail"
                          id="contactEmail"
                          type="text"
                          placeholder="Contact Email"
                          onChange={this.handleInputChange}
                          defaultValue={employer.contactEmail}
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
                          defaultValue={employer.telephone}
                        />
                        {telephoneError && (
                          <div className="invalid-feedback">
                            <span className="text-danger float-left">{telephoneError}</span>
                          </div>
                        )}
                      </div>

                      <div className="col-sm-12 mt-4">
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          id="description"
                          type="text"
                          placeholder="Description"
                          onChange={this.handleInputChange}
                          defaultValue={employer.description}
                        ></textarea>
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
                          defaultValue={employer.address}
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
                          defaultValue={employer.country}
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
                          defaultValue={employer.city}
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
                          defaultValue={employer.province}
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
                          defaultValue={employer.zipCode}
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
      </div>
    );
  }
}

export default withRouter(EmployerProfile);
