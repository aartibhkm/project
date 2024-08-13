import { Box, Typography } from "@mui/material";
import React from "react";

const Index = ({ heading }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      p={2} 
      bgcolor="primary.main"  
      color="primary.contrastText" 
      borderRadius={1}  
      boxShadow={2}  
      width="100%" 
      sx={{
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {heading}
      </Typography>
    </Box>
  );
};

export default Index;
