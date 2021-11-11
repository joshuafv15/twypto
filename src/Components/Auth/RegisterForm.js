import React, { useState } from "react";
import classes from "./Form.module.css";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { saveUser } from "../../slices/authSlice";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const registerUserHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        dispatch(saveUser(userCredential.user));
        //const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorCode, errorMessage);
        // ..
      });
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <form className={classes.form} onSubmit={registerUserHandler}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className={classes.button} type="submit">
          Register
        </Button>
        <p>
          Already have an account?{" "}
          <span className={classes.register} onClick={props.switchForm}>
            Login
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
