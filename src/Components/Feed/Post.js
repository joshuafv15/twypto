import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import classes from "./Post.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

function Post(props) {
  const user = useSelector((state) => state.auth.user);
  const post = props.post;
  const [like, setLike] = useState(post.likes.includes(user.uid));
  const postRef = doc(db, "posts", post.postId);

  const addLikeHandler = async () => {
    setLike(true);
    await updateDoc(postRef, {
      likes: arrayUnion(user.uid),
    });
  };
  const removeLikeHandler = async () => {
    setLike(false);
    await updateDoc(postRef, {
      likes: arrayRemove(user.uid),
    });
  };
  return (
    <div className={classes.post}>
      <div className={classes.avatar}>
        <Avatar src={post?.profilePic || ""} />
      </div>
      <div className={classes.body}>
        <div className={classes.bodyHeader}>
          <div className={classes.headerText}>
            <h3>
              {post?.userDisplayName} <span>@{post?.tagName}</span>
            </h3>
          </div>
          <div className={classes.headerDescription}>
            <p>{post?.text}</p>
          </div>
        </div>
        {post?.postImage && (
          <img src={post?.postImage} alt="" className={classes.postImage} />
        )}
        <div className={classes.footer}>
          {like ? (
            <FavoriteIcon
              sx={{ color: "#F91880" }}
              onClick={removeLikeHandler}
            />
          ) : (
            <FavoriteBorderIcon onClick={addLikeHandler} />
          )}
          <span>{post?.likes.length} people liked this post</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
