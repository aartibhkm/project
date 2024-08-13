import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material";

const Root = styled(Box)({
  background: "url(/images/background/BgTexture1.jpeg) no-repeat center center",
  backgroundSize: "cover",
  minHeight: "90vh",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 2rem",
});

const Content = styled(Box)({
  textAlign: "center",
  padding: "3rem 2rem",
  maxWidth: "500px",
  margin: "0 auto",
  borderRadius: "12px",

});

const Title = styled(Typography)({
  fontSize: 45,
  color: "#333",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: "bold",
  lineHeight: "1.2",
});

const Subtitle = styled(Typography)({
  fontSize: "1.6rem",
  color: "#555",
  marginTop: "1rem",
  fontWeight: "300",
});

const StyledButton = styled(Button)({
  textTransform: "capitalize",
  width: "fit-content",
  margin: "2.5rem auto 0 auto",
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

const Index = ({ isLoginView, handleAuthType }) => {
  return (
    <Root sx={{
      display:{
        xs: "none !important",
        sm: "none !important",
        md: "flex !important",
      },
    }}>
      <Content>
        <Title variant="h1">Welcome to Kailash Hardware</Title>
        <Subtitle variant="h4">
          {!isLoginView ? "If you have an account" : "don't have an account yet?"}
        </Subtitle>
        <StyledButton onClick={() => handleAuthType(isLoginView)}>
          {!isLoginView ? "Login" : "Register"}
        </StyledButton>
      </Content>
    </Root>
  );
};
export default Index;
