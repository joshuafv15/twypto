import React, { useState } from "react";
import classes from "./TweetBox.module.css";
import { Avatar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { checkURL } from "../Sidebar/Sidebar";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function TweetBox() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = useSelector((state) => state.auth.user);
  const newPostHandler = async () => {
    let img = undefined;
    if (!text[0]) {
      return;
    } else {
      if (checkURL(imageUrl)) {
        img = imageUrl;
      }
      const post = {
        timestamp: serverTimestamp(),
        text,
        userDisplayName: user.displayName,
        ...(img && { postImage: img }),
        profilePic: user.photoURL,
        tagName: user.email.substring(0, user.email.indexOf("@")),
        likes: [],
        userId: user.uid,
      };
      try {
        await addDoc(collection(db, "posts"), post);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setText("");
      setImageUrl("");
    }
  };
  return (
    <div className={classes.tweetBox}>
      <form>
        <div className={classes.tweetBoxInput}>
          <Avatar src={user.photoURL || ""} />
          <input
            type="text"
            placeholder="What's happening..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Optional: Enter image URL"
          className={classes.imageInput}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Button className={classes.tweetButton} onClick={newPostHandler}>
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
