import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import apiHelper from "../../../utils/apiHelper";
import ToastNotification from "../../Notification/ToastNotification";

// Validation Schema
export const signupValidationSchema = yup.object().shape({
  fName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  width: "100%",
  padding: 60,
  boxSizing: "border-box",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledForm = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const StyledButton = styled(Button)({
  marginTop: "16px",
});
const StyledButton2 = styled(Button)({
  textTransform: "capitalize",
  width: "fit-content",
  padding: "0.4rem 2.5rem",
  display: "block",
  border: "2px solid #007BFF",
  // backgroundColor: "#007BFF",
  color: "#007bff",
  fontWeight: "bold",

  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#0056b3",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    color: "#fff",
  },
  "&:active": {
    backgroundColor: "#004494",
    transform: "translateY(0)",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
  },
});
const Index = ({ handleAuthType }) => {
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
  const handleSignUp = async (values) => {
    try {
      console.log(values);
      const response = await apiHelper("/user/signup", {}, "POST", values);
      // Save the token and user information to session storage
      sessionStorage.setItem("authToken", response?.token);
      sessionStorage.setItem("user", JSON.stringify(response?.user));
      handleShowNotification(response?.status, "success");
      // Redirect to the home '/' route
      window.location.href = "/";
    } catch (error) {
      console.log(error?.response?.data?.message);
      handleShowNotification(error?.response?.data?.message, "error");
    } finally {
      // Optionally reset the form
      formik.resetForm();
    }
  };
  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      // Handle form submission
      handleSignUp(values);
    },
  });

  return (
    <>
      <FormContainer
        sx={{
          width: {
            md: "50% !important",
            sm: "100% !important",
            xs: "100% !important",
          },
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Create Your Account
        </Typography>
        <StyledForm component="form" onSubmit={formik.handleSubmit}>
          <TextField
            sx={{
              width: { xs: "100%", sm: "49%" },
            }}
            fullWidth
            id="fName"
            name="fName"
            label="First Name"
            value={formik.values.fName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fName && Boolean(formik.errors.fName)}
            helperText={formik.touched.fName && formik.errors.fName}
            margin="normal"
          />
          <TextField
            sx={{
              width: { xs: "100%", sm: "49%" },
            }}
            fullWidth
            id="lName"
            name="lName"
            label="Last Name"
            value={formik.values.lName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lName && Boolean(formik.errors.lName)}
            helperText={formik.touched.lName && formik.errors.lName}
            margin="normal"
          />
          <TextField
            sx={{
              width: { xs: "100%", sm: "49%" },
            }}
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="normal"
          />
          <TextField
            sx={{
              width: { xs: "100%", sm: "49%" },
            }}
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            sx={{
              width: "100%",
            }}
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <StyledButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Sign Up
          </StyledButton>
        </StyledForm>
        <Divider
          sx={{
            width: "100%",
            margin: "0.5em 0",
            display: {
              xs: "flex",
              sm: "flex",
              md: "none !important",
            },
          }}
        />
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none !important",
            },
          }}
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body1">Already have an account? /</Typography>
          <Button
            variant="text"
            onClick={() => handleAuthType(true)}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Login
          </Button>
        </Box>
      </FormContainer>
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
