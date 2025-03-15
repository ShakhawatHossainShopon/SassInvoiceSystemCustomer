import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

const ReactAlert = ({ success = true, message }) => {
  return (
    <div>
      {success ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {message}
        </Alert>
      ) : (
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ReactAlert;
