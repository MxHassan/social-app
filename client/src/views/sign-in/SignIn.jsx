import { useContext, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { Link, styled, useTheme, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import axios from "axios";

export const SignButton = styled(Button)(({ theme }) => ({
  fontSize: "22px",
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px 12px",
  fontWeight: 700,
}));

export default function SignIn() {
  const navigate = useNavigate();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  // const [errors, setErrors] = useState({
  //   email: false,
  //   password: false,
  // });
  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  // });
  // const updateError = (propName, newValue) => {
  //   setErrors({
  //     ...errors,
  //     [propName]: newValue,
  //   });
  // };
  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  //   updateError(e.target.name, !ValidiateProps(e.target.name, e.target.value));
  // };

  const theme = useTheme();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await new FormData(e.currentTarget);
    const userCredentials = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const resToken = await axios.post("/auth/login", userCredentials);
      // console.log(resToken.data);
      const { username, accessToken } = resToken.data;
      // const headers = {
      //   authorization: `Bearer ${accessToken}`,
      //   // "Content-Type": "application/json",
      // };
      // const verifyToken = await axios.post(`/auth/verify/${username}`, {
      //   headers,
      // });
      // console.log("this is verify data", verifyToken.data);
      const resUser = await axios.get(`/users?username=${username}`);
      dispatch({ type: "LOGIN_SUCCESS", payload: resUser.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
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
            Sign in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            // inputRef={emailRef}
            error={error}
            helperText={error && "Invalid username"}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            // inputRef={passwordRef}
            error={error}
            helperText={error && "Invalid password"}
            autoComplete="current-password"
          />
          {/* <Box> */}
          <FormControlLabel
            control={
              <Checkbox name="remember" value="remember" color="primary" />
            }
            label="Remember me"
          />
          <Link
            variant="body1"
            onClick={(e) => {
              e.preventDefault();
              navigate("/recovery");
            }}
            href={"/recovery"}
          >
            Forget password ?
          </Link>
          {/* </Box> */}
          <Button
            disabled={isFetching}
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
            {isFetching ? <CircularProgress size="35px" /> : "Sign In"}
          </Button>
        </Box>
        <SignButton
          disabled={isFetching}
          onClick={() => navigate("/signup")}
          color="success"
          variant="contained"
          fullWidth
        >
          {isFetching ? (
            <CircularProgress size="39px" />
          ) : (
            "Create a new account"
          )}
        </SignButton>
      </Box>
    </ThemeProvider>
  );
}
