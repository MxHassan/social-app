import {
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

import {
  Share,
  Favorite,
  ThumbUp,
  MoreVert,
  Delete,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// project imports
import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/auth/AuthContext";
import { BASE_URL } from "../../constants";
import { REACT_APP_PUBLIC_FOLDER as PF } from "../../constants";

const Post = ({ post }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  const handleLike = () => {
    try {
      axios.put(`${BASE_URL}/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleDelete = () => {
    const reqBody = { userId: currentUser._id };
    console.log("this is front post id", post._id);
    console.log("this is front user id", currentUser._id);
    console.log("this is front reqBody", reqBody);
    try {
      axios.delete(
        `${BASE_URL}/posts/${post._id}/delete`,
        { headers: { "Content-Type": "application/json" } },
        { userId: currentUser._id }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${BASE_URL}/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="postBox">
      <Card sx={{ width: "100%" }}>
        <div className="postTop">
          <CardHeader
            avatar={
              <Link to={`/profile/${user.username}`}>
                <IconButton disableRipple>
                  <Avatar
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                  />
                </IconButton>
              </Link>
            }
            action={
              post.userId === currentUser._id && (
                <IconButton onClick={handleDelete} aria-label="settings">
                  <Delete htmlColor="black" />
                </IconButton>
              )
            }
            title={
              <>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/profile/${user.username}`}
                >
                  <span className="postUsername">{user.username}</span>
                </Link>
                <span className="postDate">{format(post.createdAt)}</span>
              </>
            }
          />
        </div>
        <div className="postCenter">
          <CardContent>
            <Typography variant="body1">{post?.description}</Typography>
          </CardContent>

          <div className="postImg">
            {post.img && <CardMedia component="img" image={PF + post.img} />}
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <CardActions>
              <IconButton onClick={handleLike} aria-label="Like">
                <ThumbUp color={isLiked ? "primary" : "inherit"} />
              </IconButton>
              <IconButton onClick={handleLike} aria-label="Love">
                <Favorite color={isLiked ? "error" : "inherit"} />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
