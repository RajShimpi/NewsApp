import React from "react";
import loadingGif from "./Loading.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loadingGif} alt="loading" />
    </div>
  );
};

export default Spinner;
