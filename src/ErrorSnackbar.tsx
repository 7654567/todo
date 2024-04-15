import React from "react";
import { Alert, Snackbar } from "@mui/material";

type ErrorSnackbarPropsTypes = {
  error: string | null;
  handleClose: () => void;
};
export const ErrorSnackbar = ({
  error,
  handleClose,
}: ErrorSnackbarPropsTypes) => {
  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};
