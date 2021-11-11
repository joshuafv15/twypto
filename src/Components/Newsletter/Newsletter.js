import React from "react";
import classes from "./Newsletter.module.css";
import Article from "./Article";
import PriceTracker from "./PriceTracker";
import { useSelector } from "react-redux";
import { useGetNewsQuery } from "../../services/cryptoNewsApi";
import { CircularProgress } from "@material-ui/core";

const Newsletter = () => {
  const currentCoin = useSelector((state) => state.coin.currentCoin);
  const { data, isFetching } = useGetNewsQuery(currentCoin + " crypto");
  const mobileLayoutOpen = useSelector((state) => state.mobileLayout.open);

  return (
    <div
      className={`${classes.newsletter} ${
        mobileLayoutOpen && classes.newsletterOpen
      }`}
    >
      <h2>Newsletter</h2>
      <div className={classes.news}>
        {!isFetching ? (
          data?.value.map((article, i) => {
            return <Article key={i} article={article} />;
          })
        ) : (
          <CircularProgress className={classes.loading} />
        )}
        <div className={classes.moreNews}>
          <span>
            {currentCoin === "Cryptocurrencies" ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://coinmarketcap.com/currencies/crypto/news/`}
              >
                More News &#8594;
              </a>
            ) : (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://coinmarketcap.com/currencies/${currentCoin.toLowerCase()}/news/`}
              >
                More News &#8594;
              </a>
            )}
          </span>
        </div>
      </div>
      <PriceTracker />
    </div>
  );
};

export default Newsletter;
