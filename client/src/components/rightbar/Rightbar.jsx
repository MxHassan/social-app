import { Box, Button, Drawer, IconButton, ThemeProvider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

// project imports
import "./rightbar.css";
import CustomToolbar from "../customtoolbar/CustomToolbar";
import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";

import Online from "../online/Online";
import { Users } from "../../dummyData";
import { drawerWidth } from "../../layout/MainLayout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { BASE_URL } from "../../constants";

const ResponsiveRightbar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
export function RightbarProfile({ user }) {
  const { user: currentuser, dispatch } = useContext(AuthContext);
  const [followings, setFollowings] = useState([]);
  const [isFollowed, setIsFollowed] = useState(null);
  useEffect(() => {
    setIsFollowed(currentuser?.followings.includes(user._id));
  }, [user._id, currentuser.followings]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const getFollowings = async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}/users/followings/` + user._id
          );
          setFollowings(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getFollowings();
    }, 500);
    return () => clearTimeout(timeout);
  }, [user]);

  const handleFollow = async (e) => {
    try {
      if (isFollowed) {
        await axios.put(`${BASE_URL}/users/${user._id}/unfollow`, {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${BASE_URL}/users/${user._id}/follow`, {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setIsFollowed(!isFollowed);
  };
  return (
    <Box sx={{ width: drawerWidth + 20, marginTop: "30px" }}>
      {user.username !== currentuser.username && (
        <IconButton
          onClick={handleFollow}
          className="rightbarFollowButton"
          sx={{ fontWeight: "500" }}
          color="inherit"
          disableRipple
        >
          {isFollowed ? "Unfollow" : "Follow"}
          {isFollowed ? <Remove /> : <Add />}
        </IconButton>
      )}
      <h4 className="rightbarTitle">User Informaion</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoKey">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoKey">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
          <span className="rightbarInfoKey">
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Married"
              : "Empty"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {followings.map((follower) => (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            key={follower._id}
            to={`/profile/${follower.username}`}
          >
            <div className="rightbarFollowing">
              <img
                src={
                  follower.profilePicture
                    ? PF + follower.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{follower.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
}

function Rightbar({ profile, sx, user }) {
  const theme = useTheme();
  function RightbarHomepage({ user }) {
    return (
      <Drawer
        sx={{
          zIndex: theme.zIndex.appBar - 2,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <CustomToolbar />
        <Box sx={{ overflow: "auto" }} className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src={PF + "gift.png"} alt="" />
            <span className="birthdayText">
              <b>Mohamed Hassan</b> and <b>3 other friends have</b> a birhtday
              today
            </span>
          </div>
          <img className="rightbarAd" src={PF + "ad.png"} alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map((user) => (
              <Online key={user.id} user={user} />
            ))}
          </ul>
        </Box>
      </Drawer>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveRightbar sx={sx} className="rightbar">
        {!profile ? (
          <RightbarHomepage user={user} />
        ) : (
          <RightbarProfile user={user} />
        )}
      </ResponsiveRightbar>
    </ThemeProvider>
  );
}

export default Rightbar;
