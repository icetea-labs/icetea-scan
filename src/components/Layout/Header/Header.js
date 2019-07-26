import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../../assets/img/logo.png';
import logo from '../../../assets/img/icetea-logo.svg';
import Menu from '../Menu/Menu';
import SearchBox from '../../elements/SearchBox';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="itea-scan" />{' '}
          </Link>
        </div>
        <div className="searchBoxHeader">
          <SearchBox isHeader />
        </div>
        <Menu />
      </header>
    );
  }
}

export default Header;
