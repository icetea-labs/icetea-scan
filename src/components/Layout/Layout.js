import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';

class Layout extends Component {
  render() {
    return (
      <div className="layout_container">
        <SideBar />
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;