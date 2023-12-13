import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";

import { Outlet } from "react-router-dom";

// project imports

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import CustomToolbar from "../components/customtoolbar/CustomToolbar";
import { drawerWidth } from "./MainLayout";

const theme = createTheme();

const ResponsiveSidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));
    
const MinimalLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CustomToolbar>
            <Navbar />
          </CustomToolbar>
        </AppBar>

        <ResponsiveSidebar>
          <Sidebar drawerWidth={drawerWidth} />
        </ResponsiveSidebar>
        <Box flexGrow="1">
          <CustomToolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MinimalLayout;
