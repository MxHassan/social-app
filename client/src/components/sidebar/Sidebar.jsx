import {
  Box,
  Drawer,
  List,
  Divider,
  ListItemButton,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import "./sidebar.css";
// import { friendList, menuItems } from "./data";
import CustomToolbar from "../customtoolbar/CustomToolbar";
import StyledIcon from "../customicon/StyledIcon";
import StyledButton from "../custombutton/CustomButton";
import Online from "../online/Online";
import { Users, menuItems } from "../../dummyData";

const ResponsiveSidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

function Sidebar({ drawerWidth, open, handleDrawerClose }) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveSidebar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <CustomToolbar />

          <Box sx={{ overflow: "auto" }}>
            <List sx={{ marginLeft: 2 }}>
              {menuItems.map((item) => (
                <ListItemButton
                  // onClick={() => alert("clicked")}
                  key={item.text}
                >
                  <StyledIcon>{item.icon}</StyledIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
              <StyledButton
                sx={{ ml: 2, width: "50%" }}
                disableElevation
                color="info"
                variant="contained"
              >
                Show More
              </StyledButton>
            </List>
            <Divider />
            {/* friends list */}
            <List>
              {Users.map((u) => (
                <Online sidebar key={u.id} user={u} />
              ))}
            </List>
          </Box>
        </Drawer>
      </ResponsiveSidebar>
    </ThemeProvider>
  );
}

export default Sidebar;
