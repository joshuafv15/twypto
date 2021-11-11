import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthPage = () => {
  const [loginForm, setLoginForm] = useState(true);
  const switchFormHandler = () => {
    setLoginForm((prevState) => !prevState);
  };
  return (
    <>
      <div className={classes.authPage}>
        <div className={classes.img}>
          <img src="./authPage.png" className={classes.background} alt="auth" />
        </div>
        <div className={classes.forms}>
          <div className={classes.form}>
            <h1 className={classes.header}>What's Happening in Crypto</h1>
            <h3>Join Twypto to find out!</h3>
            {loginForm ? (
              <LoginForm switchForm={switchFormHandler} />
            ) : (
              <RegisterForm switchForm={switchFormHandler} />
            )}
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <p>
          Welcome to the Crypto Twitter. Explore the latest news and stats of
          the biggest coins in the World and see what the people have to say
          about it.
        </p>
      </div>
    </>
  );
};

export default AuthPage;
