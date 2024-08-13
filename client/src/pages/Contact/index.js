import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import * as Yup from "yup";
import "../../styles/Contact.css";
import apiHelper from "../../utils/apiHelper";
// Define validation schema with Yup
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  project: Yup.string().required("Project is required"),
  message: Yup.string().required("Message is required"),
});

const Index = ({ isManifestEnabled }) => {
  const initialValue = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    project: "",
    message: "",
  };

  const [userDetails, setUserDetails] = useState(initialValue);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const validate = async () => {
    try {
      await schema.validate(userDetails, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorData = {};
      err.inner.forEach((error) => {
        errorData[error.path] = error.message;
      });
      setErrors(errorData);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    // Example submission logic
    try {
      // Replace with your actual API endpoint and method
      const response = await apiHelper("/customerQuery",{},"POST",{
        name: userDetails.name,
        email: userDetails.email,
        mobile: userDetails.mobile,
        address: userDetails.address,
        state: userDetails.state,
        city: userDetails.city,
        project: userDetails.project,
        message: userDetails.message,
      }) ;
      console.log(response);
      if (response.status === "success") {
        alert("Form submitted successfully!");
        setUserDetails(initialValue); // Reset form fields
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Box className="contact-page">
      <Box className="image-container">
        <img src={"/images/banner/contact/Contact.jpg"} alt="Contact Us" />
      </Box>
      <Box className="banner">
        <Typography variant="h2">Contact Us</Typography>
      </Box>
      <Box className="intro-text">
        <Typography variant="body1">
          We would love to hear from you. Our solution experts will cater to all
          your needs and enquiries. Whether you are looking to renovate,
          reconstruct or upgrade your space, our experts will guide you from
          conceptualization to implementation. Leave us a message, and we'll get
          back to you as soon as possible.
        </Typography>
      </Box>
      <Grid container spacing={2} className="contact-cards">
        <Grid item xs={12} md={4}>
          <Paper className="contact-card">
            <Typography variant="h6">
              <MdEmail />
              <strong>Email ID</strong>
            </Typography>
            <Typography variant="body1">Kvats9910@gmail.com</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="contact-card">
            <Typography variant="h6">
              <FaPhoneAlt />
              <strong>Phone</strong>
            </Typography>
            <Typography variant="body1">+123 456 7890</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="contact-card">
            <Typography variant="h6">
              <CiLocationOn />
              <strong>Address</strong>
            </Typography>
            <Typography variant="body1">Adarsh Nagar</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box className="form-container">
        <Typography variant="h4" component="h2" gutterBottom>
          <u>Enquiry Form</u>
        </Typography>
        {isManifestEnabled ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Object.keys(initialValue).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    value={userDetails[key]}
                    onChange={handleChange}
                    error={Boolean(errors[key])}
                    helperText={errors[key]}
                    required
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={userDetails.message}
                  onChange={handleChange}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  multiline
                  rows={5}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography variant="h6" color="error">
            Manifest functionality is currently disabled.
          </Typography>
        )}
      </Box>
      <Box className="customer-care">
        <Typography variant="h4">Customer Care</Typography>
        <Box className="service-box">
          <Typography variant="body1">
            <strong>Plumber Service:</strong> 12345xxxxx
          </Typography>
          <Typography variant="body1">
            <strong>Other Services:</strong> 98765xxxxx
          </Typography>
          <Typography variant="body1">
            Monday - Saturday (Between 9:00 AM to 8:00 PM)
          </Typography>
        </Box>
      </Box>
      <Box className="bottom-banner">
        <Typography variant="body1">
          Hope you found it useful. Pleasure connecting with you.
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
