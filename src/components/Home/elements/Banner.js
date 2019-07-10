import React, { Component } from "react";
import SearchBox from "../../Layout/SearchBox/SearchBox";
import "./Banner.scss";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="flex">
          <div className="type-search">
            <div>
              <h3>ICETEA CHAIN EXPLORER (TESTNET)</h3>
            </div>
            <SearchBox show_cb="banner" />
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
