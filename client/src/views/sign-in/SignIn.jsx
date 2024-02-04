import { useContext } from "react";
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
import { BASE_URL } from "../../constants";

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
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await new FormData(e.currentTarget);
    const userCredentials = {
      username: data.get("username"),
      password: data.get("password"),
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.foundUser });
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
            error={error}
            helperText={error && "Invalid password"}
            autoComplete="current-password"
          />
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
          Create a new account
        </SignButton>
      </Box>
    </ThemeProvider>
  );
}
