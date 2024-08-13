import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ToastNotification = ({
  open,
  onClose,
  severity = "info",
  message,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
  variant = "filled",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} variant={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
