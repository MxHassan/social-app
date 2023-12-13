import {
  Box,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { SignButton } from "../views/sign-in/SignIn";
const logoColor = blue["A700"];
const backgroundBlue = blue[50];

const SignLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = createTheme();
  function MainContent() {
    return (
      <Box
        sx={{
          height: "100vh",
          bgcolor: backgroundBlue,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h3" sx={{ color: logoColor }}>
            xMoSocial
          </Typography>
          <Typography variant="body1">
            Connect with your friends and the world arround you on xMoSocial.
          </Typography>
          {!open && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "300px",
              }}
            >
              <SignButton
                onClick={() => {
                  setOpen(!open);
                  navigate("signup");
                }}
                color="success"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  ":hover": {
                    backgroundColor: "lightgreen",
                    color: logoColor,
                  },
                }}
              >
                Sign Up
              </SignButton>
              <SignButton
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  ":hover": {
                    backgroundColor: "lightgreen",
                    color: logoColor,
                  },
                }}
                onClick={() => {
                  setOpen(!open);
                  navigate("signin");
                }}
                color="success"
              >
                Sign In
              </SignButton>
            </Box>
          )}
        </Box>
        <Copyright />
      </Box>
    );
  }
  function Copyright(props) {
    return (
      <Typography
        mt={20}
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" to="/">
          xMoSocial
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      {open ? (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}>
            <MainContent />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Outlet />
          </Grid>
        </Grid>
      ) : (
        <MainContent />
      )}
    </ThemeProvider>
  );
};

export default SignLayout;
