import React, { Component } from "react";
import ReactDOM from "react-dom";
import Stars from "./Stars.jsx";

window.Stars = Stars;
ReactDOM.render(<Stars />, document.getElementById("root"));

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <>
//         <Stars />
//       </>
//     );
//   }
// }
