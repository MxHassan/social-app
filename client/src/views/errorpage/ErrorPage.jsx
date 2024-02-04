import { useRouteError, useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Grid } from "@mui/material";
import "./errorpage.css";

import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";
export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error.status === 404 ? (
              <img
                className="errorImg"
                src={PF + "404-tranc.png"}
                alt="Error 404"
              />
            ) : (
              <Typography color="error" variant="h1">
                {error.status}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              Sorry, an unexpected error has occurred.
            </Typography>
            <Typography color="error" variant="h6">
              {error.data} is "{error.statusText || error.message}"
            </Typography>
            <Button
              sx={{ marginTop: "20px" }}
              color="secondary"
              onClick={() => navigate("/")}
              variant="contained"
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
