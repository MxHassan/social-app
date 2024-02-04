import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";

// project imports
import "./profiledetails.css";
import Rightbar from "../rightbar/Rightbar";
import Feed from "../feed/Feed";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
import { BASE_URL } from "../../constants";
import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";

const ProfileDetails = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(AuthContext);

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BASE_URL}/users?username=${username}`);
      setUser(res.data);
    };
    username === currentUser.username ? setUser(currentUser) : fetchUser();
  }, [username]);

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="profile">
        <div className="profileTop">
          <div className="profileCover">
            <img
              src={
                user.coverPicture
                  ? PF + user.coverPicture
                  : PF + "person/noCover.png"
              }
              alt=""
              className="profileCoverImg"
            />
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="profileUserImg"
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDescription">{user.description}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: "1000px",
              padding: "32px",
              marginLeft: "40px",
            }}
            className="feedShare"
          >
            <Feed sx={{ flexGrow: 1, maxWidth: "1000px" }} />
          </Box>
          <Rightbar profile user={user} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProfileDetails;
