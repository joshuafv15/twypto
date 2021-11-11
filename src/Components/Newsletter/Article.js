import React from "react";
import classes from "./Article.module.css";

const Article = ({ article }) => {
  const title = article?.name;
  const description = article?.description.substring(0, 60) + "...";
  const imgUrl =
    article?.image?.thumbnail.contentUrl ||
    "https://dynamic-assets.coinbase.com/3317e543d6fb7ec792a9020f772418ad2c09240d1ee6f2be9f7891957b379bdedf8cf200020207707fb0c65eb9952764d4667db17e313c9b89d5d4ec462ddaeb/news_article_images/de7529cef93c2f728c52561c1a610967ac8c6781fc960bc87290af71407b18a4.jpg";
  const articleUrl = article.url;
  return (
    <a
      href={articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.article}
    >
      <div className={classes.content}>
        <h4>{title}</h4>
        <p className={classes.text}>{description}</p>
      </div>
      <img className={classes.thumbnail} src={imgUrl} alt="article" />
    </a>
  );
};

export default Article;
