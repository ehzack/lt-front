// Import the 'useFormik' hook from the Formik library and the 'Yup' validation library
import React, { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import * as AuthAction from "../state/AuthAction";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import image from "../../../assets/images/logo3.webp";

const FormAuth = () => {
  const [stateSnackBar, setStateSnackBar] = useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "right",
    severity: "success",
    duration: 3000,
    message: "",
  });

  // Define a function that will handle the close event of the snackbar
  const handleClose = (event, reason) => {
    // If the reason for the close event was a clickaway, do nothing
    if (reason === "clickaway") {
      return;
    }

    // Otherwise, update the state to close the snackbar
    setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
  };

  // Destructure some values from the stateSnackBar object
  const { openSnackBar, vertical, horizontal, severity, duration, message } =
    stateSnackBar;

  // Define a piece of state to store whether or not the password should be shown
  const [showPassword, setShowPassword] = useState(false);

  // Define a function to handle toggling the showPassword state
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Get the dispatch function from the useDispatch hook
  const dispatch = useDispatch();



  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "auto",
    margin: "20px auto",
    backgroundColor: "white",
  };

  const btnstyle = {
    margin: "8px 0",
    m: 2,
    p: 1,
    width: "30ch",
    color: "white",
    background: "rgb(53, 71, 115)",
  };

  // Create a Formik form instance
  const formik = useFormik({
    // Set the initial form values
    initialValues: {
      username: "",
      password: "",
    },
    // Define the validation schema using Yup object methods
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Mot de passe est obligatoire"),
    }),
    // Define the function to be called when the form is submitted
    onSubmit: (values) => {
      const request = {
        payload: values,
        successCallBack: (response) => {
          // localStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("token", response.data.accessToken);
          window.location.href = "/Balisage";

        },
        failCallBack: (error) => {
          const messageError = error.response.data.message;
          setStateSnackBar({
            ...stateSnackBar,
            severity: "error",
            message: messageError,
            openSnackBar: true,
          });
        },
      };
      dispatch(AuthAction.AuthStart(request));
    },
  });

  // Destructure properties from the formik object for use in the component
  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <img alt="" src={image} style={{ width: "227px" }} loading="lazy" />
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: "36px",
              fontFamily: "Circular Pro",
              color: "white",
            }}
          >
            Se connecter
          </Typography>
        </Grid>
        <Grid align="center">
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <Box className="divStyle">
                <Box className="inputStyle">
                  <Box
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "30ch",
                        backgroundColor: "#f2f7fa",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-password-input"
                      label="Username"
                      type="text"
                      autoComplete="current-password"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Box>
                </Box>

                <Box className="inputStyle">
                  <Box
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "30ch",
                        backgroundColor: "#f2f7fa",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      autoComplete="current-password"
                      sx={{
                        mb: 3,
                        maxWidth: "450px",
                        width: "100%",
                        "& > label": {
                          color: "#aca1a1cf!important",
                        },
                      }}
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                </Box>
              </Box>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                // sx={{
                //   m: 2,
                //   p: 1,
                //   width: "30ch",
                //   color: "white",
                //   background: "rgb(53, 71, 115)",

                // }}
              >
                {" "}
                Se connecter
              </Button>
            </Form>
          </FormikProvider>
        </Grid>
      </Paper>
      <Box>
        {openSnackBar && (
          <Snackbar
            open={openSnackBar}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={duration}
            onClose={handleClose}
          >
            <Alert severity={severity} onClose={handleClose}>
              {message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Grid>
  );
};

export default FormAuth;
