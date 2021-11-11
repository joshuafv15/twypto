import React, { useState } from "react";
import classes from "./Form.module.css";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { saveUser } from "../../slices/authSlice";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    const emailEntered = email;
    const passwordEntered = password;
    setEmail("");
    setPassword("");

    await signInWithEmailAndPassword(auth, emailEntered, passwordEntered)
      .then((userCredential) => {
        // Signed in
        dispatch(saveUser(userCredential.user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };
  return (
    <>
      <form className={classes.form} onSubmit={loginHandler}>
        <input
          type="text"
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
          Login
        </Button>
        <p>
          Don't have an account?{" "}
          <span className={classes.register} onClick={props.switchForm}>
            Register
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
