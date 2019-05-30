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
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;