import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="search_box_container">
        <input className="search_input" type="text" placeholder="Search by block, transaction, asset, address or orderid" />
        <button className="btn_search"><i className="fa fa-search"></i></button>
      </div>
    );
  }
}

export default SearchBox;