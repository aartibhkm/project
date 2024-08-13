import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import "../../styles/Installation_service.css";
import { serviceValidationSchema } from "../../utils/validationSchema"; // Adjust the path
import apiHelper from "../../utils/apiHelper.js";
import ToastNotification from "../../components/Notification/ToastNotification";
const Index = () => {
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState("auto");
  const [notification, setNotification] = useState({
    open: false,
    severity: "info",
    message: "",
  });
  const handleShowNotification = (message, severity = "info") => {
    setNotification({
      open: true,
      severity,
      message,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };
  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);
  const handleSubmit = async (values) => {
    const { customerName, address, phoneNumber, description } = values;
    try {
      const response = await apiHelper("/installationQuery", {}, "POST", {
        customerName,
        address,
        phoneNumber,
        problemFacing: description,
      });
      if (response.status === "success") {
        handleShowNotification(
          "Service request submitted successfully",
          "success"
        );
      } else {
        alert("Service request failed. Please try again later");
      }
    } catch (error) {
      console.error("Service request error", error);
      alert("Service request failed. Please try again later");
    }
  };
  const formik = useFormik({
    initialValues: {
      customerName: "",
      address: "",
      phoneNumber: "",
      description: "",
    },
    validationSchema: serviceValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  return (
    <>
      <div className="service-container">
        <div className="banner-top">Plumber Service</div>
        <div className="form-image-wrapper">
          <div className="service-form-container" ref={formRef}>
            <h2>Service Request Form</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.customerName && formik.errors.customerName ? (
                  <div className="error">{formik.errors.customerName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="error">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description of Problem:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error">{formik.errors.description}</div>
                ) : null}
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/155/162/original/tradesman-plumber-fixing-vector.jpg"
            alt="Plumber Service"
            className="service-image"
          />
        </div>
        <div className="banner-bottom">Pleasure connecting with you</div>
      </div>
      <ToastNotification
        open={notification.open}
        onClose={handleCloseNotification}
        severity={notification.severity}
        message={notification.message}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
};

export default Index;
