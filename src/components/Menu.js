import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="main_nav">
        <ul className="nav_hed">
          <li className="nav_items"><Link to="/">Home</Link></li>
          <li className="nav_items sub">Blockchain <span className="fa fa-caret-down"></span>
            <ul className="sub_child">
              <li className="sub_child_items"><Link to="/blocks">View Blocks</Link></li>
              <li className="sub_child_items"><Link to="/txs">View Txns</Link></li>
            </ul>
          </li>
          <li className="nav_items"><Link to="/assets">Contracts</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;