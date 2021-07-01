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
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
