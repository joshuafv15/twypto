import React from "react";
import { useSelector } from "react-redux";
import { useGetCoinQuery } from "../../services/cryptoApi";
import { CircularProgress } from "@material-ui/core";
import classes from "./PriceTracker.module.css";

const PriceTracker = () => {
  const currentCoin = useSelector((state) => state.coin.currentCoin);
  const skip = !(currentCoin && currentCoin !== "Cryptocurrencies");
  const coin = currentCoin?.toLowerCase();
  const { data, isFetching } = useGetCoinQuery(coin, {
    skip,
  });
  let price = data?.market_data.current_price.eur;
  if (price < 1000) {
    price = price?.toFixed(2);
  } else {
    price = price?.toFixed(0);
  }
  const change = data?.market_data.price_change_percentage_24h.toFixed(2);
  const website = data?.links.homepage[0];

  return (
    <div className={classes.priceTracker}>
      {!isFetching ? (
        currentCoin !== "Cryptocurrencies" ? (
          <div>
            <div className={classes.coin}>
              <img
                className={classes.coinLogo}
                src={`${currentCoin.toLowerCase()}.png`}
                alt="coin"
              />
              <h2>{currentCoin}</h2>
            </div>
            <div className={classes.moreCoinInfo}>
              <h2>{price}€</h2>
              <div className={classes.change}>
                <span>Last 24h</span>
                {change > 0 ? (
                  <h2 className={classes.upTick}>&#8599;{change}%</h2>
                ) : (
                  <h2 className={classes.downTick}>&#8600;{change * -1}%</h2>
                )}
              </div>

              <h2>
                <a
                  href={website}
                  className={classes.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Site
                </a>
              </h2>

              <h2>
                <a
                  href={`https://coinmarketcap.com/currencies/${currentCoin}/`}
                  className={classes.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chart
                </a>
              </h2>
            </div>
          </div>
        ) : (
          <h1 className={classes.noCoin}>Select a coin</h1>
        )
      ) : (
        <CircularProgress className={classes.loading} />
      )}
    </div>
  );
};

export default PriceTracker;
