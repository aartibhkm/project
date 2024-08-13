import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "../Login";
import Signup from "../Signup";
import Sidebar from "../Sidebar";
import CloseIcon from "@mui/icons-material/Close";
// Styled components
const Container = styled(Box)({
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // background:"#fff"
});

const Card = styled(Box)({
  width: "80%",
  height: "80%",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "row",
  boxShadow: 10,
  borderRadius: 20,
  overflow: "hidden",
  bg: "background.paper",
  position: "relative",
  ">div": {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Index = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleAuthType = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <Container>
      <Card>
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => (window.location.href = "/")}
        >
          <CloseIcon fontSize="large" color="action" />
        </IconButton>
        {isLoginView ? (
          <Login handleAuthType={handleAuthType} />
        ) : (
          <Signup handleAuthType={handleAuthType} />
        )}
        <Sidebar isLoginView={isLoginView} handleAuthType={handleAuthType} />
      </Card>
    </Container>
  );
};

export default Index;
