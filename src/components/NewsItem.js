import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ height: "500px", position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />

        <div className="card-body" style={{ paddingBottom: "60px" }}>
          <h5
            className="card-title"
            style={{ height: "48px", overflow: "hidden" }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{ height: "90px", overflow: "hidden" }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
