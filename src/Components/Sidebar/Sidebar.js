import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOptions from "./SidebarOptions";
import { Button, Modal, Box, Typography, Avatar, Input } from "@mui/material";
import { changeCurrentCoin } from "../../slices/coinSlice";
import { updateProfilePicture, saveUser } from "../../slices/authSlice";
import { auth } from "../../firebase";
import { signOut, updateProfile } from "@firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  query,
  collection,
  where,
  updateDoc,
  getDocs,
  doc,
} from "@firebase/firestore";
import { db } from "../../firebase";

export function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [pictureModal, setPictureModal] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const user = useSelector((state) => state.auth.user);
  const mobileLayoutOpen = useSelector((state) => state.mobileLayout.open);
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const changeCurrentCoinHandler = () => {
    dispatch(changeCurrentCoin("Cryptocurrencies"));
  };
  const logoutHandler = () => {
    dispatch(saveUser(null));
    signOut(auth);
  };
  const openInfoHandler = () => {
    setOpen((prevState) => !prevState);
  };
  const handleClose = () => {
    setPictureModal(false);
  };
  const handleOpen = () => {
    setPictureModal(true);
  };

  const updateProfilePictureHandler = async (e) => {
    e.preventDefault();
    if (checkURL(pictureUrl)) {
      updateProfile(user, {
        photoURL: pictureUrl,
      });
      dispatch(updateProfilePicture(pictureUrl));
      const updateDocPicture = async (id) => {
        const postRef = doc(db, "posts", id);
        await updateDoc(postRef, {
          profilePic: pictureUrl,
        });
      };
      const q = query(collection(db, "posts"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        updateDocPicture(doc.id);
      });
    } else {
      alert("Invalid Picture");
    }
    setPictureModal(false);
  };
  return (
    <div
      className={`${classes.sidebar} ${
        mobileLayoutOpen && classes.sidebarOpen
      }`}
    >
      <TwitterIcon
        className={classes.twitterIcon}
        onClick={changeCurrentCoinHandler}
      />
      <SidebarOptions imgUrl="./bitcoin.png" text="Bitcoin" />
      <SidebarOptions imgUrl="./ethereum.png" text="Ethereum" />
      <SidebarOptions imgUrl="./cardano.png" text="Cardano" />
      <SidebarOptions imgUrl="./litecoin.png" text="Litecoin" />
      <SidebarOptions imgUrl="./tether.png" text="Tether" />
      <SidebarOptions imgUrl="./vechain.png" text="VeChain" />

      <div className={classes.bottomButton}>
        <Button
          variant="outlined"
          className={`${classes.tweetButton} ${open && classes.open}`}
          fullWidth
          onClick={openInfoHandler}
        >
          {open ? (
            <div className={classes.opened}>
              <Avatar className={classes.avatar} src={user.photoURL || ""} />
              <div className={classes.profile}>
                <h4 onClick={handleOpen}>Update Avatar</h4>
                <h4 onClick={logoutHandler} className={classes.logoutButton}>
                  Logout
                </h4>
              </div>
            </div>
          ) : (
            <div className={classes.closed}>
              <Avatar className={classes.avatar} src={user.photoURL || ""} />
              <h3>{user.displayName}</h3>
            </div>
          )}
        </Button>
      </div>
      <Modal
        open={pictureModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={updateProfilePictureHandler}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Your Profile Picture
            </Typography>

            <Input
              placeholder="Paste Your New Picture Url"
              className={classes.urlInput}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
            <Button type="submit">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Update Picture
              </Typography>
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
