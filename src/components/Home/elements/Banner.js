import React, { PureComponent } from 'react';
import SearchBox from '../../Layout/SearchBox/SearchBox';
import './Banner.scss';

class Banner extends PureComponent {
  render() {
    return (
      <div className="banner-container">
        <h3>ICETEA CHAIN EXPLORER (TESTNET)</h3>
        <div className="searh-box">
          <SearchBox show_cb="banner" />
        </div>
      </div>
    );
  }
}

export default Banner;
