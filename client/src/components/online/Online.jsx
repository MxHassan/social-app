import "./online.css";
import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { Avatar, List, ListItemButton, ListItemText } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  marginRight: "10px",
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Online({ user, sidebar }) {
  return (
    <List disablePadding sx={{ margin: "0px" }}>
      <div className="rightbarProfileImgContainer">
        <ListItemButton key={user.id}>
          {!sidebar ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={PF + user.profilePicture} />
            </StyledBadge>
          ) : (
            <Avatar
              sx={{ marginRight: "15px" }}
              src={PF + user.profilePicture}
            />
          )}
          <ListItemText>{user.username}</ListItemText>
        </ListItemButton>
      </div>
    </List>
  );
}
