import React from "react";
import classes from "./SidebarOptions.module.css";
import { useDispatch } from "react-redux";
import { changeCurrentCoin } from "../../slices/coinSlice";
import { useSelector } from "react-redux";

const SidebarOptions = ({ text, imgUrl }) => {
  const currentCoin = useSelector((state) => state.coin.currentCoin);
  const dispatch = useDispatch();
  const changeCurrentCoinHandler = () => {
    dispatch(changeCurrentCoin(text));
  };
  return (
    <div
      className={`${classes.sidebarOption} ${
        currentCoin === text && classes.active
      }`}
      onClick={changeCurrentCoinHandler}
    >
      <img className={classes.coinLogo} src={imgUrl} alt={text} />
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOptions;
