import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

class Menu extends Component {
  render() {
    return (
      <div className="main_nav nf">
        <ul className="nav_hed">
          <Link to="/">
            <li className="nav_items">Home</li>
          </Link>
          <Link to="/blocks">
            <li className="nav_items">View Blocks</li>
          </Link>
          <Link to="/txs">
            <li className="nav_items">View Transactions</li>
          </Link>
          <Link to="/contracts">
            <li className="nav_items">Contracts</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default Menu;
