import React, { Component } from "react";
import "../App.css"
export default class Header extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", fontFamily: "Poppins" }}>
        <h1>Linear Regression Visualizer</h1>
        <h3>
          <a
            href="https://github.com/Hugo-WB"
            target="_blank"
            style={{ color: "black", textDecoration: "none" }}
            rel="noopener noreferrer"
          >
            By Hugo Wong-Berard
          </a>
        </h3>
      </div>
    );
  }
}
