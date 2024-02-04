import { Avatar, Box, Divider, IconButton } from "@mui/material";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext, useRef, useState } from "react";

// project imports
import "./share.css";
import StyledButton from "../custombutton/CustomButton";
import { AuthContext } from "../../context/auth/AuthContext";
import axios from "axios";

import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";
import { BASE_URL } from "../../constants";

function ShareArea({ sx }) {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const describtion = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: describtion.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post(`${BASE_URL}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }
    if (describtion.current.value) {
      try {
        await axios.post("/posts", newPost);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("the post shouldn't be empty");
    }
  };
  return (
    <>
      <Box sx={sx} className="shareBox">
        <div className="shareContentTop">
          <Avatar
            sx={{ width: "50px", height: "50px" }}
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
          />
          <input
            ref={describtion}
            name="describtion"
            className="shareInput"
            type="text"
            placeholder={`What's in your mind ${user.username} ?`}
          />
        </div>
        <Divider sx={{ m: "20px" }} />
        {file && (
          <div className="shareImgContainer">
            <IconButton
              className="shareCancelButton"
              disableRipple
              onClick={() => setFile(null)}
            >
              <Cancel />
            </IconButton>
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
          </div>
        )}
        <Box
          component="form"
          className="shareContentBottom"
          onSubmit={handleSubmit}
        >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <IconButton disabled>
                <PermMedia htmlColor="tomato" />
              </IconButton>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="postImg"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <IconButton disabled>
                <Label htmlColor="blue" />
              </IconButton>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <IconButton disabled>
                <Room htmlColor="green" />
              </IconButton>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <IconButton disabled>
                <EmojiEmotions htmlColor="goldenrod" />
              </IconButton>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <StyledButton
            type="submit"
            disableElevation
            color="success"
            variant="contained"
          >
            Share
          </StyledButton>
        </Box>
      </Box>
    </>
  );
}

export default ShareArea;
