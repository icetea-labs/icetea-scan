import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/img/logo.png';
import Menu from './elements/Menu/Menu';
import SearchBox from '../SearchBox/SearchBox';
import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to="/"><img width={40} height={40} src={logo} alt="itea-scan" /> </Link>
        </div>
        <div className='search-box'>
          <SearchBox show_cb='header' />
        </div>
        <Menu />
      </div>
    );
  }
}

export default Header;