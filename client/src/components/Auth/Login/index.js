import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import "./styles.css";
import {
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { loginValidationSchema } from "../../../utils/validationSchema";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import apiHelper from "../../../utils/apiHelper";
import ToastNotification from "../../Notification/ToastNotification";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 60,
  boxSizing: "border-box",
  borderRadius: "8px",
  backgroundColor: "white",
});

const StyledForm = styled(Box)({
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "16px",
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
  const handleLogin = async (values) => {
    try {
      console.log(values);
      const response = await apiHelper("/user/login", {}, "POST", values);
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const responseFacebook = (response) => {
    console.log(response);
  };

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
        <Typography variant="h4" gutterBottom>
          Login your account
        </Typography>
        <StyledForm component="form" onSubmit={formik.handleSubmit}>
          <TextField
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
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            margin="normal"
          />
          <StyledButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Login
          </StyledButton>
          <Box display={"flex"} flexDirection={"column"} gap={2} mt={2}>
            <Divider>
              <Chip label="Or Continue with" size="small" />
            </Divider>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <GoogleLogin
                onSuccess={(credential, Response) => {
                  console.log(credential, Response);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
              />
            </Box>
          </Box>
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
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "none !important",
            },
          }}
        >
          <Typography variant="body1">don't have an account? /</Typography>
          <Button
            variant="text"
            onClick={() => handleAuthType(true)}
            sx={{
              textTransform: "capitalize",
            }}
          >
            Register
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
