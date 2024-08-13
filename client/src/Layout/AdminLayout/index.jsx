// import "/style.css";
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Admin/Sidebar";
import { useSelector } from "react-redux";
const Index = ({ children }) => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;
  return (
    <Box display={"flex"} flexDirection={"row"} bgcolor={"white"}>
      <Sidebar />
      <Box sx={{ width: "100%", overflow:"scroll" , position:"relative" }}>{children}</Box>
    </Box>
  );
};

export default Index;
