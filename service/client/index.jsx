import React, { Component } from "react";
import ReactDOM from "react-dom";
import Stars from "./Stars.jsx";
import Description from "./Description.jsx";
import Images from "./images.jsx";
const App = () => {
  return (
    <div className="flex gap-6 bg-gray-200">
      <Images />
      <div className="">
        <Stars />
        <Description />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="grey"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        />
      </svg>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
