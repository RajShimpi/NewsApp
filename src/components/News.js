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

  // const updateNews = async () => {
  //   try {
  //     props.setProgress(10);
  //     // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
  //     const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&q=${props.country}&category=${props.category}`;

  //     setLoading(true);

  //     let data = await fetch(url);

  //     // Check if the response is okay
  //     if (!data.ok) {
  //       throw new Error(`Error: ${data.status} ${data.statusText}`);
  //     }

  //     props.setProgress(30);
  //     let parsedData = await data.json();
  //     props.setProgress(70);
  // console.log(parsedData);

  //     // Ensure parsedData is valid and contains articles
  //     if (parsedData && parsedData.articles) {
  //       setArticles(parsedData.articles);
  //       setTotalResults(parsedData.totalResults);
  //     } else {
  //       throw new Error("No articles found");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch news data:", error);
  //   } finally {
  //     setLoading(false);
  //     props.setProgress(100);
  //   }
  // };
  const updateNews = async () => {
    try {
      console.log(props);

      props.setProgress(10);
      const url =
        props.category != "general"
          ? `https://newsdata.io/api/1/news?apikey=${props.apiKey}&q=${props.country}&category=${props.category}`
          : `https://newsdata.io/api/1/news?apikey=${props.apiKey}&q=${props.country}`;

      setLoading(true);

      let data = await fetch(url);

      // Check if the response is okay
      if (!data.ok) {
        throw new Error(`Error: ${data.status} ${data.statusText}`);
      }

      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      console.log(parsedData);

      // Ensure parsedData contains results (articles)
      if (parsedData && parsedData.results) {
        setArticles(parsedData.results); // Update to use parsedData.results
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
      // const url = `https://newsapi.org/v2/top-headlines?country=${
      //   props.country
      // }&category=${props.category}&apiKey=${props.apiKey}&page=${
      //   page + 1
      // }&pageSize=${props.pageSize}`;
       const url =
         props.category != "general"
           ? `https://newsdata.io/api/1/news?apikey=${props.apiKey}&q=${props.country}&category=${props.category}`
           : `https://newsdata.io/api/1/news?apikey=${props.apiKey}&q=${props.country}`;

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
                          ? element.description.slice(0, 150) + "..."
                          : element.description
                        : ""
                    }
                    imageUrl={element.image_url}
                    newsUrl={element.link}
                    author={element.creator}
                    date={element.pubDate}
                    source={element.source_name}
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
