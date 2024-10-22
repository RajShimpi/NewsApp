import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const updateNews = async () => {
  try {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;

    setLoading(true);

    let data = await fetch(url);

    // Check if the response is okay
    if (!data.ok) {
      throw new Error(`Error: ${data.status} ${data.statusText}`);
    }

    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    // Ensure parsedData is valid and contains articles
    if (parsedData && parsedData.articles) {
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } else {
      throw new Error("No articles found");
    }
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  } finally {
    setLoading(false);
    props.setProgress(100);
  }
};



  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsWave`;
    updateNews();
    // eslint-disable-next-line
  }, []);

const fetchMoreData = async () => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    let data = await fetch(url);

    // Check if the response is okay
    if (!data.ok) {
      throw new Error(`Error: ${data.status} ${data.statusText}`);
    }

    let parsedData = await data.json();

    // Ensure parsedData is valid and contains articles
    if (parsedData && parsedData.articles) {
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(page + 1);
    } else {
      throw new Error("No more articles found");
    }
  } catch (error) {
    console.error("Failed to fetch more news data:", error);
  }
};

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsWave- Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length || 0}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title.length > 100
                        ? element.title.slice(0, 100) + "..."
                        : element.title
                    }
                    description={
                      element.description
                        ? element.description.length > 100
                          ? element.description.slice(0, 100) + "..."
                          : element.description
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
