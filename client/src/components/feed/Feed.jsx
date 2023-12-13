import { Box, ThemeProvider, styled, useTheme } from "@mui/material";

// project imports
import "./feed.css";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
import ShareArea from "../share/ShareArea";
import { useParams } from "react-router-dom";
const StyledFeed = styled(Box)(({ theme }) => ({
  maxWidth: "680px",
}));

function Feed({ sx }) {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <StyledFeed sx={sx}>
        {(!username || username === user.username) && <ShareArea />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </StyledFeed>
    </ThemeProvider>
  );
}

export default Feed;
