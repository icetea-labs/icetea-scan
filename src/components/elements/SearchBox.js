import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'antd';
const { Search } = Input;

class SearchBox extends Component {
  onSearchData = value => {
    // console.log(value);
    if (!value) return;
    const { history } = this.props;
    if (!isNaN(value)) {
      history.push('/block/' + value);
    } else {
      if (value.substring(0, 3) === 'tea') {
        history.push('/address/' + value);
      } else {
        if (value.length === 64 && value === value.toUpperCase()) {
          history.push('/tx/' + value);
        } else {
          history.push('/exception');
        }
      }
    }
  };

  render() {
    return (
      <div className="searchContainer">
        <Search
          placeholder="Search by block, transaction or address"
          onSearch={value => {
            this.onSearchData(value);
          }}
          onPressEnter={value => {
            this.onSearchData(value.currentTarget.value);
          }}
          style={{ width: '100%' }}
          allowClear={true}
        />
      </div>
    );
  }
}

// export default SearchBox;
export default withRouter(SearchBox);
