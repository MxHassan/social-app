import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { CircularProgress, FormHelperText, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ValidiateProps } from "../../utils/validation";
import axios from "axios";
import { BASE_URL } from "../../constants";

const SignButton = styled(Button)(({ theme }) => ({
  fontSize: "22px",
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px 12px",
  fontWeight: 700,
}));
const formInputs = [
  {
    id: "username",
    name: "username",
    type: "text",
    label: "Username",
    autoFocus: true,
    autoComplete: "username",
    errormessage:
      "Username should be 3-16 characters , includes at least 1 number and without any special characters !",
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    autoComplete: "email",
    errormessage: "It should be a valid email address !",
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    autoComplete: "new-password",
    errormessage:
      "Password should be 8-20 characters and include at least 1 uppercase letter , 1 number and 1 special character !",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    autoComplete: "new-password",
    errormessage:
      "Password should be 8-20 characters and include at least 1 uppercase letter , 1 number and 1 special character !",
  },
];

export default function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();
  // form validation process
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [matchError, setMatchError] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const updateError = (propName, newValue) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [propName]: newValue,
    }));
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    let result = !ValidiateProps(e.target.name, e.target.value);
    updateError(e.target.name, result);
  };

  // form submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userCredentials = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    if (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      if (values.password === values.confirmPassword) {
        setMatchError(false);
        console.log(userCredentials);
        try {
          await axios.post(`${BASE_URL}/auth/register`, userCredentials);
          navigate("/signin");
        } catch (err) {
          console.log(err);
        }
      } else {
        setMatchError(true);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 32px",
        }}
      >
        <Box
          sx={{
            marginBottom: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {formInputs.map((input) => (
              <Grid key={input.id} item xs={12}>
                <TextField
                  value={values[input.name]}
                  onChange={onChange}
                  helperText={errors[input.name] && input.errormessage}
                  error={errors[input.name]}
                  required
                  fullWidth
                  {...input}
                />
              </Grid>
            ))}
            {matchError && (
              <FormHelperText error sx={{ marginLeft: 3, fontSize: 14 }}>
                Passwords Don't match
              </FormHelperText>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              textTransform: "none",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            {/* {isFetching ? <CircularProgress size="35px" /> : "Sign Up"} */}
            Sign Up
          </Button>
        </Box>
        <SignButton
          onClick={() => navigate("/signin")}
          color="secondary"
          variant="contained"
          fullWidth
        >
          {/* {isFetching ? <CircularProgress size="35px" /> : "Sign in with your account"} */}
          Sign in with your account
        </SignButton>
      </Box>
    </ThemeProvider>
  );
}
