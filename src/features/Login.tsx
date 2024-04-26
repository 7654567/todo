import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../state/store";
import { Navigate } from "react-router-dom";
import { logginTC } from "../state/auth-reducer";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "MWdRPBAhgbRa9JF",
      rememberMe: true,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(logginTC(values));
    },
  });
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );

  /*...*/

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.email ? <div>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox />}
                {...formik.getFieldProps("rememberMe")}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};