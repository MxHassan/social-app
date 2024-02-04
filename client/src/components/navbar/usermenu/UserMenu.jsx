import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  AdminPanelSettings,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";

// project imports
import { REACT_APP_PUBLIC_FOLDER as PF } from "../../../constants";

function UserMenu() {
  const { user, dispatch } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    {
      id: 1,
      text: "Profile",
      icon: <AccountCircle />,
      path: `/profile/${user.username}`,
    },
    {
      id: 2,
      text: "My Account",
      icon: <ManageAccounts />,
      path: `/account/${user.username}`,
    },
    {
      id: 3,
      text: "Dashboard",
      icon: <AdminPanelSettings />,
      path: `/dashboard/${user.username}`,
    },
  ];

  return (
    <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
      <Tooltip onClick={handleOpenUserMenu} title="profile">
        <IconButton sx={{ p: 0 }}>
          <Avatar
            sx={{
              height: "50px",
              width: "50px",
            }}
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <Link
            style={{
              textDecoration: "none",
              color: "inherit",
              fontSize: "20px",
            }}
            key={setting.id}
            to={`${setting.path}`}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <IconButton disableRipple size="large" color="inherit">
                {setting.icon}
              </IconButton>
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
          </Link>
        ))}
        <MenuItem
          onClick={() => {
            dispatch({ type: "LOGOUT" });
          }}
        >
          <IconButton disableRipple size="large" color="inherit">
            <Logout />
          </IconButton>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
