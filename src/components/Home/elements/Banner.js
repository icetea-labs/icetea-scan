import React, { Component } from 'react';
import SearchBox from '../../Layout/SearchBox/SearchBox';
import './Banner.scss';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="container">
          <div className="flex">
            <div className="type-search">
              <div>
                <h3>ICETEA CHAIN EXPLORER</h3>
                <a className='direc_link' href='https://studio.icetea.io' color='white'>Check out IceTeaStudio <i className="fa fa-arrow-right "></i></a>
              </div>
              <SearchBox show_cb='banner' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;