import React from "react";
import "./styles.css";
import { Box, CircularProgress } from "@mui/material";
const Index = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
        zIndex: 99,
        top: 0,
        right: 0,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Index;
