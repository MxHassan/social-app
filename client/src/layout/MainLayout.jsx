import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";

import { Outlet } from "react-router-dom";
// project imports
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Rightbar from "../components/rightbar/Rightbar";
import CustomToolbar from "../components/customtoolbar/CustomToolbar";
import SpacingBox from "../components/spacingbox/SpacingBox";

const theme = createTheme();
export const drawerWidth = 300;
const ResponsiveSidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

function MainLayout() {
  const matchMd = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
        {matchMd && <SpacingBox />}
        <Box>
          <CustomToolbar />
          <Outlet />
        </Box>
        {matchMd && <SpacingBox />}
        <Rightbar drawerWidthMain={drawerWidth} />
      </Box>
    </ThemeProvider>
  );
}

export default MainLayout;
