import {
  Box,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Home, GroupAdd, MoreVert, Notifications } from "@mui/icons-material";
import ViewTimelineRoundedIcon from "@mui/icons-material/ViewTimelineRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

// project imports
// import UserMenu from "../usermenu/UserMenu";
import { useState } from "react";

export default function MobileMenu() {
  const navigate = useNavigate();
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    console.log("this is mobile" + mobileMoreAnchorEl);

    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    console.log("this is mobile" + mobileMoreAnchorEl);

    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <Tooltip title="more">
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <IconButton size="large" aria-label="Homepage" color="inherit">
            <Home />
          </IconButton>
          <p>Homepage</p>
        </MenuItem>
        <MenuItem
          href="/feed"
          onClick={(e) => {
            e.preventDefault();
            navigate("/feed");
          }}
        >
          <IconButton size="large" aria-label="Timeline" color="inherit">
            <ViewTimelineRoundedIcon />
          </IconButton>
          <p>Timeline</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 3 new friend request"
            color="inherit"
          >
            <Badge badgeContent={3} color="error">
              <GroupAdd />
            </Badge>
          </IconButton>
          <p>Friend Requests</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <ForumRoundedIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      </Menu>
    </Box>
  );
}
