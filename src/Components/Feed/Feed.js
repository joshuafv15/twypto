import React, { useEffect, useState } from "react";
import classes from "./Feed.module.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  closeMobileLayout,
  openMobileLayout,
} from "../../slices/mobileLayoutSlice";

function Feed() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), postId: doc.id });
        });
        setPosts(data);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const openHandler = () => {
    dispatch(openMobileLayout());
  };
  const closeHandler = () => {
    dispatch(closeMobileLayout());
  };

  return (
    <div className={classes.feed}>
      <div className={classes.header}>
        <h3 onClick={openHandler}>Coins</h3>
        <h2 onClick={closeHandler}>Home</h2>
        <h3 onClick={openHandler}>News</h3>
      </div>
      <TweetBox />
      {posts[0] ? (
        posts.map((postData) => {
          return <Post post={postData} key={postData.postId} />;
        })
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
}

export default Feed;
