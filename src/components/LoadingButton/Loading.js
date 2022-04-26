import React, { Component } from "react";
import "./loading.css";
export default class Loading extends Component {
  render() {
    return (
      <div>
        <div class="loader">
          <div class="outer"></div>
          <div class="middle"></div>
          <div class="inner"></div>
        </div>
      </div>
    );
  }
}
