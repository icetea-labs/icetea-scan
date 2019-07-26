import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'antd';
const { Search } = Input;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
    this.scrollTargetEl = null;
  }

  componentDidMount() {
    const { isHeader } = this.props;
    // seach on header and on home screen
    if (isHeader && this.props.location.pathname === '/') {
      this.scrollTargetEl = document;
      this.scrollTargetEl.addEventListener('scroll', this.touchEndHandle);
      this.scrollTargetEl.addEventListener('touchend', this.touchEndHandle);
    } else {
      this.setState({ isShow: true });
    }
  }

  componentWillUnmount() {
    if (this.scrollTargetEl) {
      this.scrollTargetEl.removeEventListener('touchend', this.touchEndHandle);
      this.scrollTargetEl.removeEventListener('scroll', this.touchEndHandle);
    }
  }

  touchEndHandle = () => {
    const value = this.scrollTargetEl === document ? window.pageYOffset : this.scrollTargetEl.scrollTop;
    this.setState({ isShow: value > 180 });
  };

  onSearchData = value => {
    // console.log(value);
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
    const { isShow } = this.state;

    return (
      <div className="searchContainer" style={{ display: isShow ? 'block' : 'none' }}>
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
